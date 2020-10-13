import scrapy


class LemondebotSpider(scrapy.Spider):
    name = 'lemondebot'
    allowed_domains = ['www.lemonde.fr']
    start_urls = ['http://www.lemonde.fr/']

    def parse(self, response):
        for article in response.css('div.article'):
            yield {
                'titre': article.css(".article__title *::text").extract_first(),
                'url': article.css("a::attr(href)").extract_first()
            }