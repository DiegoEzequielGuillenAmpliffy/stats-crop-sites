const { multiScrape } = require('./services/scraping');
const { appendSpreadSheetValues } = require('./services/google-sheets');

async function main () {
  const number = 1000;
  const data = await multiScrape('', number);
  return await appendSpreadSheetValues(data);
}
main();

module.exports = { main };
