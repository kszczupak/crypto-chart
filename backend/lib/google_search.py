import json
import requests
from lxml import html
from lxml.cssselect import CSSSelector



class GoogleSearch:
    BASE_URL = "https://www.google.com/search"
    BASE_HEADERS = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:61.0) Gecko/20100101 Firefox/61.0",
        "Accept-Language": "pl,en-US;q=0.7,en;q=0.3"
    }

    SELECTORS = {
        "news": CSSSelector("div.g"),
        "unsuccessful_search": CSSSelector("div.mnr-c")
    }

    @classmethod
    def get_news_as_json(cls, query, start_date, end_date, limit=10):
        returned_news = cls.get_news(
            query=query,
            start_date=start_date,
            end_date=end_date,
            limit=limit
        )

        return json.dumps([news.as_json() for news in returned_news])

    @classmethod
    def get_news(cls, query, start_date, end_date, limit=10):
        """
        Performs Google News search with given criteria.
        :param query: Main query to search for (content of search box)
        :param start_date: (Optional) start day of the search
        :param end_date: (Optional) end day of the search
        :param limit: (default=10) max number of news to return
        :return: list of GoogleNews
        """
        parsed_news = list()
        page_index = 0

        while True:
            raw_search_page = GoogleSearch._get_search_page(
                query=query,
                search_type="nws",
                start_date=start_date,
                end_date=end_date,
                page_index=page_index
            )

            if not GoogleSearch.page_search_successful(raw_search_page):
                return parsed_news

            raw_all_news_on_page = GoogleSearch.SELECTORS["news"](raw_search_page)

            for raw_news in raw_all_news_on_page:
                if len(parsed_news) >= limit:
                    return parsed_news

                parsed_news.append(GoogleNews.from_source(raw_news))

            page_index += 1

    @staticmethod
    def page_search_successful(raw_search_page):
        """
        Checks if given page contains valid search results
        :param raw_search_page: parsed html page
        :return: True if results are valid; False otherwise
        """
        selection = GoogleSearch.SELECTORS["unsuccessful_search"](raw_search_page)

        return not len(selection)

    @classmethod
    def get_images(cls):
        raise NotImplementedError()

    @staticmethod
    def _get_search_page(query, search_type, start_date, end_date, page_index):
        custom_date_range = f"cdr:1,cd_min:{start_date},cd_max:{end_date}"

        payload = {
            "q": query,
            "tbs": custom_date_range,
            "tbm": search_type,
            "start": page_index * 10
        }

        response = requests.get(
            GoogleSearch.BASE_URL,
            params=payload,
            headers=GoogleSearch.BASE_HEADERS
        )

        if response.status_code != 200:
            raise GoogleSearchError(f"Response status code was {response.status_code}")

        return html.fromstring(response.text)


class GoogleSearchError(Exception):
    pass


class GoogleNews:
    SELECTOR = {
        "title": CSSSelector(".l.lLrAF"),
        "summary": CSSSelector("div.st"),
        "date": CSSSelector(".f.nsa.fwzPFf"),
        "source": CSSSelector(".xQ82C.e8fRJf"),
        "source_url": CSSSelector(".top.NQHJEb.dfhHve"),
        "image_url": CSSSelector("img.th.BbeB2d")
    }

    def __init__(self, title, summary, date, source, source_url, image_url):
        self._title = title
        self._summary = summary
        self._date = date
        self._source = source
        self._source_url = source_url
        self._image_url = image_url

    @classmethod
    def from_source(cls, news_source):
        return cls(
            title=cls._get_element_content(news_source, "title"),
            summary=cls._get_element_content(news_source, "summary"),
            date=cls._get_element_content(news_source, "date"),
            source=cls._get_element_content(news_source, "source"),
            source_url=cls._get_element_attribute(news_source, "source_url", "href"),
            image_url=cls._get_element_attribute(news_source, "image_url", "src")
        )

    @staticmethod
    def _get_element_content(source, element_name):
        selected_area = GoogleNews._select_area(source, element_name)

        if selected_area is not None:
            return selected_area.text_content()

        return None

    @staticmethod
    def _get_element_attribute(source, element_name, attribute_name):
        selected_area = GoogleNews._select_area(source, element_name)

        if selected_area is not None:
            return selected_area.get(attribute_name)

        return None

    @staticmethod
    def _select_area(source, selector_key):
        selected_area = GoogleNews.SELECTOR[selector_key](source)

        # if len(selected_area) > 1:
        #     # raise GoogleNewsError("More than one selections match to current criteria")
        #     return ""
        if len(selected_area) < 1:
            return None
            # raise GoogleNewsError("No selection match to current criteria")

        return selected_area.pop()

    def display(self):
        print(f"Date: {self._date}")
        print(self._title)
        print(self._summary)
        print(self._source)
        print(self._source_url)

    def as_json(self):
        json_representation = {
            "title": self._title,
            "summary": self._summary,
            "date": self._date,
            "source": self._source,
            "source_url": self._source_url,
            "image_url": self._image_url
        }

        return json_representation


class GoogleNewsError(Exception):
    pass


if __name__ == '__main__':
    # Testing stuff
    all_news = GoogleSearch.get_news(
        query="bitcoin",
        start_date="1/1/2017",
        end_date="1/2/2017",
        limit=20
    )

    print(all_news[0]._title)
    # print(a.encode())

    print(len(all_news))
