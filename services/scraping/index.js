const { chromium } = require('playwright');

require('dotenv').config();
const URI = process.env.URI;

const data = [];

async function scrape (uri) {
  if (!uri) uri = URI;
  console.log(uri);
  const browser = await chromium.launch({
    headless: true, args: ['--no-sandbox']
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(uri);
  await page.waitForLoadState('networkidle');
  let length = 0;
  let items;
  while (length < 1000) {
    await page.click('button.btn');
    await page.waitForLoadState('networkidle');
    items = await page.$$('.tr');
    length = items.length;
    console.log(length);
  }
  for (let i = 0; i < 1000; i++) {
    const item = items[i];
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

async function multiScrape (uri, number) {
  if (!uri) uri = URI;
  return await scrape(uri + '/' + number * 1 + '/');
  // return await scrape(uri + '/' + number * 2 + '/');
}

module.exports = {
  scrape,
  multiScrape
};
