require('dotenv').config();

module.exports = {
  URI: process.env.URI || '',
  API: process.env.API || '',
  SPREAD_SHEET_ID: process.env.SPREAD_SHEET_ID || ''
};
