const express = require('express');
// const cors = require('cors');
require('dotenv').config();

const PORT = 3001;

const app = express();
// app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { multiScrape } = require('./services/scraping');
const { appendSpreadSheetValues } = require('./services/google-sheets');

app.get('/', async (req, res) => {
  const { num, key } = req.query;
  if (key === process.env.SPREAD_SHEET_ID) {
    const data = await multiScrape('', num);
    res.send(data);
  }
  res.send('clave inválida');
});

app.get('/append', async (req, res) => {
  const { num, key } = req.query;
  if (key === process.env.SPREAD_SHEET_ID) {
    const data = await multiScrape('', num);
    await appendSpreadSheetValues(data);
    res.send(data);
  }
  res.send('clave inválida');
});

app.listen(PORT, () => console.log(`Node server listening on port ${PORT}!`));
