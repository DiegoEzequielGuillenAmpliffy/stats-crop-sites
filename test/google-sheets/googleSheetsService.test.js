const { getAuth, getSpreadSheet, getSpreadSheetValues } = require('../../google-sheets/googleSheetsService.js');

const config = require('../../config.js');
const { SPREAD_SHEET_ID } = config;

async function main () {
  await getAuth();
  const spreadsheetId = SPREAD_SHEET_ID;
  const range = 'Statscrop Sites';// 'Class Data!A2:E';
  console.log(await getSpreadSheet({ spreadsheetId }));
  // console.log(await getSpreadSheetValues({ spreadsheetId, range }));
}
main();
