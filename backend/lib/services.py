from collections import namedtuple
import time
import subprocess
from sys import stdout, stderr
import socket


Process = namedtuple("Process", ["service", "handle"])


class AbstractService:
    @property
    def name(self) -> str:
        raise NotImplementedError()

    def command(self) -> list:
        raise NotImplementedError()

    def ready(self) -> bool:
        raise NotImplementedError()


class SimpleService(AbstractService):
    def __init__(self, name, command):
        super().__init__()
        self._name = name
        self._command = command

    def command(self):
        return self._command

    @property
    def name(self):
        return self._name

    def ready(self):
        time.sleep(1)
        return True


class PythonScript(AbstractService):
    def __init__(self, service_name, script):
        super().__init__()
        self._service_name = service_name
        self._script = script

    def command(self) -> list:
        return [
            "python",
            self._script
        ]

    @property
    def name(self) -> str:
        return self._service_name

    def ready(self) -> bool:
        # What is a clever way to check if python script is up?
        time.sleep(1)
        return True


class Crossbar(AbstractService):
    def __init__(self, config_path, host, port):
        super().__init__()
        self._config_path = config_path
        self._host = host
        self._port = port

    @property
    def name(self):
        return "Crossbar Router"

    def command(self):
        # noinspection SpellCheckingInspection
        return [
            "crossbar",
            "start",
            "--cbdir",
            self._config_path
        ]

    def ready(self):
        """
        Tries to connect raw socket to crossbar router. If attempt is successful,
        crossbar router is consider to be ready.
        """

        testing_socket = socket.socket()

        try:
            testing_socket.connect((self._host, self._port))
        except ConnectionRefusedError:
            return False
        finally:
            testing_socket.close()

        return True


class ServicesRunnerException(Exception):
    pass


class ServicesRunner:
    def __init__(self, services):
        self._services = services
        self._validate_services()
        self._processes = list()
        self._timeout = None

    def run(self, timeout=30):
        self._timeout = timeout

        self._start_services()

        try:
            while True:
                time.sleep(10)
        except KeyboardInterrupt:
            self._stop_services()

    def _start_services(self):
        for service in self._services:
            print(f"Starting {service.name}...")
            handle = subprocess.Popen(
                args=service.command(),
                # shell=True,
                stdout=stdout,
                stderr=stderr
            )
            self._processes.append(
                Process(
                    service=service,
                    handle=handle
                )
            )

            start_time = time.time()

            # Wait until service is ready or timeout is reached
            while True:
                if service.ready():
                    break

                elapsed_time = time.time() - start_time

                if elapsed_time > self._timeout:
                    raise ServicesRunnerException(f"Timeout reached while starting {service.name}")

                time.sleep(1)

            print(f"{service.name} successfully started in {time.time() - start_time} sec!")

        print("All services successfully started, press CTRL+C to stop...")

    def _stop_services(self):
        print("CTRL+C detected, stopping all services...")

        for process in reversed(self._processes):
            print(f"Stopping {process.service.name}...")
            process.handle.terminate()
            process.handle.wait()

        print("All services stopped!")

    def _validate_services(self):
        for service in self._services:
            if not isinstance(service, AbstractService):
                raise ServicesRunnerException(f"Service {service} shall implement AbstractService protocol.")
