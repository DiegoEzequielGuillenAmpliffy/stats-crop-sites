const { chromium } = require('playwright');

require('dotenv').config();
const URI = process.env.URI;

async function scrape (uri) {
  if (!uri) uri = URI;
  const browser = await chromium.launch({
    headless: true, args: ['--no-sandbox']
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(uri);
  await page.waitForLoadState('networkidle');
  // const html = await page.content();
  // const fs = require('fs');
  // fs.appendFile('page.html', html, function (err) {
  //   if (err) throw err;
  //   console.log('Saved!');
  // });
  const data = [];
  const items = await page.$$('.tr');
  for (const item of items) {
    const textSuccess = await item.$eval('.text-success', el => el.textContent);
    const site = textSuccess.trim();
    const textMuted = await item.$eval('.text-muted', el => el.textContent);
    const textMutedArray = textMuted.split(':');
    const rank = textMutedArray[1].replace(/\D/g, '');
    const visitors = textMutedArray[2].trim();
    data.push([site, '#' + rank, visitors]);
  }
  await page.waitForTimeout(1000);
  await browser.close();
  return data;
}

module.exports = {
  scrape
};
