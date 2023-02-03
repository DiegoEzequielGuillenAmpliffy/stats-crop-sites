const { multiScrape, scrape } = require('../../../services/scraping');

async function main () {
  const number = 1000;
  const data = await multiScrape('', number);
  console.log(data)
  return data;
}
main();
