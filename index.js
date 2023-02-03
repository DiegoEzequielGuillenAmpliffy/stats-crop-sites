const { scrape } = require('./services/scraping');
const { appendSpreadSheetValues } = require('./services/google-sheets');

async function main () {
  const data = await scrape();
  return await appendSpreadSheetValues(data);
}
main();

module.exports = { main };
