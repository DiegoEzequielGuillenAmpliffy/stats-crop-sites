'use strict';

const path = require('path');
const { google } = require('googleapis');

const sheets = google.sheets('v4');
const keyFilename = path.join(__dirname, '../credentials.json');
const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

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

async function setSpreadSheet (spreadsheetId, sheetId, startIndex, endIndex) {
  const res = await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    resource: {
      requests: [
        {
          insertDimension: {
            range: {
              sheetId,
              dimension: 'COLUMNS',
              startIndex,
              endIndex
            },
            inheritFromBefore: false
          }
        }
      ]
    }
  });
  console.info(res);
}

async function appendSpreadSheetValues (request) {
  const res = await sheets.spreadsheets.values.append(request);
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
