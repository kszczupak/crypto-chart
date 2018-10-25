from autobahn.asyncio.wamp import ApplicationSession, ApplicationRunner
from autobahn.wamp import auth

from lib.config.parse_config import config
from lib.google_search import GoogleSearch


class ServerComponent:
    @classmethod
    def run(cls):
        print(f"Starting {cls.__name__}...")

        url = f"ws://{config['crossbar']['host']}:{config['crossbar']['port']}/ws"

        runner = ApplicationRunner(
            url=url,
            realm=config["crossbar"]["realm"]
        )

        runner.run(ServerWAMPComponent)


class ServerWAMPComponent(ApplicationSession):
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

        def get_google_news(query, start_date, end_date, limit):
            all_news = GoogleSearch.get_news_as_json(
                query=query,
                start_date=start_date,
                end_date=end_date,
                limit=limit
            )
            print(all_news)

            return all_news

        self.register(get_google_news, "GET_GOOGLE_NEWS")

        print("All OK")
