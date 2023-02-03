'use strict';

const path = require('path');
const { google } = require('googleapis');
const config = require('../../config.js');

const { SPREAD_SHEET_ID } = config;
const spreadsheetId = SPREAD_SHEET_ID;
const sheets = google.sheets('v4');
const keyFilename = path.join(__dirname, '../../credentials.json');
const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

const sheet = 'Statscrop Sites';
const range = `${sheet}`;
const valueInputOption = 'USER_ENTERED';
const insertDataOption = 'INSERT_ROWS';
// const values = [['Youtube.com', '#2', '107,900,000']];

function getRequest (values) {
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
  return request;
}

// Obtain user credentials to use for the request
async function getAuth () {
  const auth = new google.auth.GoogleAuth({
    keyFilename,
    scopes
  });
  google.options({ auth });
  const authToken = await auth.getClient();
  return authToken;
}

// async function setSpreadSheet (spreadsheetId, sheetId, startIndex, endIndex) {
//   const res = await sheets.spreadsheets.batchUpdate({
//     spreadsheetId,
//     resource: {
//       requests: [
//         {
//           insertDimension: {
//             range: {
//               sheetId,
//               dimension: 'COLUMNS',
//               startIndex,
//               endIndex
//             },
//             inheritFromBefore: false
//           }
//         }
//       ]
//     }
//   });
//   console.info(res);
// }

async function appendSpreadSheetValues (params) {
  if (Array.isArray(params)) {
    params = getRequest(params);
    await getAuth();
  }
  const res = await sheets.spreadsheets.values.append(params);
  return res.data;
}

async function getSpreadSheet ({ spreadsheetId }) {
  const res = await sheets.spreadsheets.get({ spreadsheetId });
  return res;
}
async function getSpreadSheetValues (params) {
  const res = await sheets.spreadsheets.values.get(params);
  return res.data.values;
}

module.exports = {
  getAuth,
  getSpreadSheet,
  getSpreadSheetValues,
  appendSpreadSheetValues
};
