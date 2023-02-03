const { chromium } = require('playwright');

require('dotenv').config();
const URI = process.env.URI;

// const getPage = async () => {
//   browser = await chromium.launch({
//     headless: true, args: ['--no-sandbox']
//   });
//   const context = await browser.newContext();
//   return await context.newPage();
// };
const data = [];

async function scrape (uri) {
  if (!uri) uri = URI;
  console.log(uri)
  const browser = await chromium.launch({
    headless: true, args: ['--no-sandbox']
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(uri);
  await page.waitForLoadState('networkidle');
  // console.log(page)
  // const html = await page.content();
  // const fs = require('fs');
  // fs.appendFile('page.html', html, function (err) {
  //   if (err) throw err;
  //   console.log('Saved!');
  // });
  /*
  <a class="page-link" href="/websites/top-sites/2000/" aria-label="Next">Next
  <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z">
  </path> </svg></a>
  */
  // await page.click('a.page-link');
  /*
  <button class="btn" role="button" title="See more"><label>See more</label></button>
  */
  // await page.waitForTimeout(1000);
  // await page.click('button.btn:text("See more")');
  // await page.locator('button:text("See more")').click();
  let length = 0;
  let items;
  while (length < 1000) {
    await page.click('button.btn');
    await page.waitForLoadState('networkidle');
    items = await page.$$('.tr');
    length = items.length;
    console.log(length);
  }

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

async function multiScrape (uri, number) {
  if (!uri) uri = URI;
  return await scrape(uri + '/' + number * 1 + '/');
  // return await scrape(uri + '/' + number * 2 + '/');
}

module.exports = {
  scrape,
  multiScrape
};
