const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  try {
    const url = 'https://elchapuzasinformatico.com/';
    const response = await axios(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const links = $('article.blog-item');

    const scrapedData = [];
    articles.each((index, element) => {
      const link = $(element).find('a.rocket-lazyload');
      const title = $(element).find('h2.entry-title a').text();
      const description = $(element).find('p.post-excerpt').text();
      const href = link.attr('href');
      const style = link.attr('href');
      
      scrapedData.push({ title, description, href, style });
    });

    res.status(200).json(scrapedData);
  } catch (error) {
    res.status(500).json({ error: 'Error scraping data' });
  }
};
