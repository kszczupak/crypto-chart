# noinspection PyUnresolvedReferences
# import import_project
from lib.config.parse_config import config
from lib.services import PythonScript, Crossbar, ServicesRunner

services = [
    Crossbar(
        config_path=config["crossbar"]["config_path"],
        host=config["crossbar"]["host"],
        port=config["crossbar"]["port"]
    ),
    PythonScript(
        service_name="Server Component",
        script="start_server_component.py"
    )
]

# Moze w klasie services Runner nalezy tymczasowo dodac obecny katalog (bin) do sciezki, zeby skrypty byly widoczne?
# Najprawdopodobniej pozwoli to uniknac 'zabawy' z 'import_project.py'
# Nie pozwoli bo najpierw nie zaczyta sciezki i modulow
# Jak to najlepiej obejsc? czy relatywne sciezki moga tutaj pomoc?

if __name__ == '__main__':
    runner = ServicesRunner(services)
    runner.run()
