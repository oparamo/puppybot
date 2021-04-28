'use strict';

const functions = require('firebase-functions');
const puppeteer = require('puppeteer');

const config = require('../config');

const accountSid = config.birkenstockalert.twilioAccountSid;
const authToken = config.birkenstockalert.twilioAuthToken;
const fromSms = config.birkenstockalert.fromSms;
const toSms = config.birkenstockalert.toSms;

const client = require('twilio')(accountSid, authToken);

const url = 'https://www.dsw.com/en/us/product/birkenstock-arizona-slide-sandal---womens/171995';
const sizes = {
  'size\nEU 38 / US 7-7.5\nof Product Arizona Slide Sandal - Women\'s - Not Selected': true,
  'size\nEU 39 / US 8-8.5\nof Product Arizona Slide Sandal - Women\'s - Not Selected': true,
};

const birkenStockAlert = functions.https.onRequest(async (req, res) => {
  const browser = await puppeteer.launch();

  // set up page
  const page = await browser.newPage();
  await page.setViewport({width: 1280, height: 720});
  await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
  );
  await page.goto(url, {waitUntil: 'networkidle2'});

  // click on desired color of shoes
  await page.waitForSelector('img[alt="Arizona Slide Sandal - Women\'s Mocha view"]');
  await page.click('img[alt="Arizona Slide Sandal - Women\'s Mocha view"]');

  // get all the text on all the buttons
  const buttonsText = await page.evaluate(() => {
    const buttons = [...document.querySelectorAll('button')];
    return buttons.map((button) => button.innerText);
  });

  // filter the button text to see if the right sizes are available
  const desiredSizes = buttonsText.filter((text) => sizes[text]);

  // send a text notification if the
  if (desiredSizes.length > 0) {
    console.log('shoes in size/color are in stock');

    const body = `Your birkenstocks... are in stock! 😍 P.S. I love you kibby 🐱\n${url}`;

    await client.messages.create({body, from: fromSms, to: toSms});
  } else {
    console.log('shoes in size/color not in stock');
  }

  await browser.close();

  res.end();
});

module.exports = birkenStockAlert;

