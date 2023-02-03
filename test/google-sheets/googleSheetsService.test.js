const { getAuth, getSpreadSheet, getSpreadSheetValues } = require('../../google-sheets/googleSheetsService.js');

const config = require('../../config.js');
const { SPREAD_SHEET_ID } = config;

async function main () {
  await getAuth();
  const spreadsheetId = SPREAD_SHEET_ID;
  // The A1 notation of the values to retrieve.
  // For example, if the spreadsheet data in Sheet1 is: A1=1,B1=2,A2=3,B2=4,
  // then requesting range=Sheet1!A1:B2?majorDimension=ROWS
  // returns [[1,2],[3,4]],
  // whereas requesting range=Sheet1!A1:B2?majorDimension=COLUMNS
  // returns [[1,3],[2,4]].
  const sheet = 'Statscrop Sites';
  const range = `${sheet}`;
  // console.log(await getSpreadSheet({ spreadsheetId }));

  const params = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId,
    range
    // How values should be represented in the output.
    // The default render option is ValueRenderOption.FORMATTED_VALUE.
    //valueRenderOption: '', // TODO: Update placeholder value.

    // How dates, times, and durations should be represented in the output.
    // This is ignored if value_render_option is
    // FORMATTED_VALUE.
    // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
    //dateTimeRenderOption: '' // TODO: Update placeholder value.
  };

  console.log(await getSpreadSheetValues(params));
}

main();
