import requests
from lxml import html
from bs4 import UnicodeDammit

# page_str = '<test>zap\xc5\x82aci\xc4\x87</test>'
page_str = '<test>zapłacić</test>'

page_tree = html.fromstring(page_str)

if __name__ == '__main__':
    content = page_tree.xpath("//test")[0].text_content()

    print(UnicodeDammit(content))
    print(content)