const { getAuth, getSpreadSheet, getSpreadSheetValues, appendSpreadSheetValues } = require('../../google-sheets/googleSheetsService.js');

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
    // valueRenderOption: '', // TODO: Update placeholder value.

    // How dates, times, and durations should be represented in the output.
    // This is ignored if value_render_option is
    // FORMATTED_VALUE.
    // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
    // dateTimeRenderOption: '' // TODO: Update placeholder value.
  };
  // console.log(await getSpreadSheetValues(params));

  const valueInputOption = 'USER_ENTERED';
  const insertDataOption = 'INSERT_ROWS';
  const arr = ['Youtube.com', '#2', '107,900,000'];
  const values = [arr];
  const resource = {
    // majorDimension: 'ROWS',
    values
  };
  const request = {
    // The ID of the spreadsheet to update.
    spreadsheetId,
    // The A1 notation of a range to search for a logical table of data.
    // Values are appended after the last row of the table.
    range,
    // How the input data should be interpreted.
    valueInputOption,
    // How the input data should be inserted.
    insertDataOption,
    // TODO: Add desired properties to the request body.
    resource
    // auth: authClient,
  };

  try {
    const response = await appendSpreadSheetValues(request);
    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(err);
  }
}
main();
