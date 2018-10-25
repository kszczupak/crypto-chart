from autobahn.asyncio.wamp import ApplicationSession, ApplicationRunner
from autobahn.wamp import auth

from lib.config.parse_config import config
import json


class TestingFrontEndComponent:
    @classmethod
    def run(cls):
        print(f"Starting {cls.__name__}...")

        url = f"ws://{config['crossbar']['host']}:{config['crossbar']['port']}/ws"

        runner = ApplicationRunner(
            url=url,
            realm=config["crossbar"]["realm"]
        )

        runner.run(TestingFrontEndWAMPComponent)


class TestingFrontEndWAMPComponent(ApplicationSession):
    def __init__(self, c=None):
        super().__init__(c)
        # self._request_handler = RequestsHandler(
        #     channel_prefix=config["team_loader"]["redis_key"]["channel_prefix"],
        #     wamp_session=self
        # )

    # TODO add authentication (here and in router configuration)
    def onConnect(self):
        print("Connected to Crossbar!")

        # Temporary connect without authentication
        self.join(config["crossbar"]["realm"])
        # self.join(config["crossbar"]["realm"], ["wampcra"], config["crossbar"]["auth"]["username"])

    def onDisconnect(self):
        # self._request_handler.stop()
        print("Disconnected from Crossbar!")

    # def onChallenge(self, challenge):
    #     secret = config["crossbar"]["auth"]["password"]
    #     signature = auth.compute_wcs(secret.encode('utf8'), challenge.extra['challenge'].encode('utf8'))
    #
    #     return signature.decode('ascii')

    async def onJoin(self, details):
        print("WAMP session ready!")

        print("Testing Front End OK")

        res = await self.call(
            "GET_GOOGLE_NEWS",
            "bitcoin",
            "1/1/2017",
            "1/2/2017",
            10
        )

        print(res)
        print(json.loads(res))
        print(len(res))


if __name__ == '__main__':
    TestingFrontEndComponent.run()
