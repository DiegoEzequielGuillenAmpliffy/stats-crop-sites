const { multiScrape, scrape } = require('../../../services/scraping');

async function main () {
  const number = 1000;
  // const data = await multiScrape('', number);
  const data = await scrape('https://www.statscrop.com/websites/top-sites/1000/');
  console.log(data)
  return data;
}
main();
