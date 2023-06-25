import axios from 'axios';
import cheerio from 'cheerio';

async function scrapeElChapuzas() {
    const url = 'https://elchapuzasinformatico.com/';
    const response = await axios(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = $('article.blog-item');

    const scrapedData = [];
    articles.each((index, element) => {
        const link = $(element).find('a.rocket-lazyload');
        const title = $(element).find('h2.entry-title a').text();
        const description = $(element).find('p.post-excerpt').text();
        const href = link.attr('href');
        //const img = $(element).find('a.rocket-lazyload img').attr('src');
        //const style = 'background-image: url("https://elchapuzasinformatico.com/wp-content/uploads/2023/06/OceanGate-Titan-controlado-por-Logitech-F710-378x150.jpg")';
        
        scrapedData.push({ title, description, href });
    });

    return scrapedData;
}

export default async function scrapeWebsite(source) {
  try {
    switch(source) {
      case 'elchapuzas':
        const elChapuzasData = await scrapeElChapuzas();
        return elChapuzasData;
    }
    
  } catch (error) {
    return [];
  }
};
