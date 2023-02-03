const { scrape } = require('../../../services/scraping');

async function main () {
  const data = await scrape();
  console.log(data)
  return data;
}
main();
