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

async function getSpreadSheet ({ spreadsheetId }) {
  const res = await sheets.spreadsheets.get({ spreadsheetId });
  return res;
}
async function getSpreadSheetValues ({ spreadsheetId, sheetName }) {
  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range: sheetName });
  return res;
}

function getListMajors (spreadsheetId, range) {
  // const sheets = google.sheets('v4');
  // open();
  sheets.spreadsheets.values.get(
    {
      // auth, // : this.authorizeUrl,
      spreadsheetId,
      range
    },
    (err, res) => {
      if (err) {
        console.error('The API returned an error.');
        throw err;
      }
      const rows = res.data.values;
      if (rows.length === 0) {
        console.log('No data found.');
      } else {
        console.log('Name, Major:');
        for (const row of rows) {
          // Print columns A and E, which correspond to indices 0 and 4.
          console.log(`${row[0]}, ${row[4]}`);
        }
      }
    }
  );
}

module.exports = { getAuth, getSpreadSheet, getSpreadSheetValues, getListMayors };
