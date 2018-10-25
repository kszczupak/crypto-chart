import datetime


def json_conversion_handler(x):
    """
    Handles conversion of the custom object to json
    :param x:
    :return:
    """
    if isinstance(x, datetime.datetime):
        return x.isoformat()
    raise TypeError("Unknown type")
