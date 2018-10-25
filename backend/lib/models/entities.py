from datetime import datetime
from pony.orm import *

from lib.config import *


db = Database()


class Post(db.Entity):
    id = PrimaryKey(int, auto=True)
    created_at = Required(datetime)
    title = Required(str)
    link = Optional(str)
    score = Optional(int, size=32)


def setup_database():
    try:
        db.bind(
            provider=config["database"]["provider"],
            filename=config["database"]["filename"],
            create_db=True
        )

        db.generate_mapping(create_tables=True)
    except Exception as e:
        print(e)
