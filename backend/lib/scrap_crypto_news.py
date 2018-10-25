import praw
from pony.orm import *
from datetime import datetime

from lib.models.entities import setup_database, Post
from lib.config.parse_config import config

setup_database()

reddit = praw.Reddit(
    client_id=config["reddit"]["app_id"],
    client_secret=config["reddit"]["secret"],
    user_agent=config["reddit"]["user_agent"]
)

subreddit = reddit.subreddit(
    config["reddit"]["crypto_subreddit"]["name"]
)

_search_query = "flair:General-News"


@db_session
def scrap_reddit_posts_to_database():
    for index, submission in enumerate(subreddit.search(query=_search_query, sort="new", syntax="cloudsearch", limit=1000)):
    # for index, submission in enumerate(subreddit.top(limit=None)):
        if not index % 100:
            print(index)

        # Post(
        #     created_at=datetime.fromtimestamp(submission.created),
        #     title=submission.title,
        #     link=submission.url,
        #     score=submission.score
        # )

    print(index)


if __name__ == '__main__':
    scrap_reddit_posts_to_database()
