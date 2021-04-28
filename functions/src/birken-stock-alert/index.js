'use strict';

const functions = require('firebase-functions');
const puppeteer = require('puppeteer');

const config = require('../config');

const accountSid = config.birkenstockalert.twilioAccountSid;
const authToken = config.birkenstockalert.twilioAuthToken;

const client = require('twilio')(accountSid, authToken);

const alertMsg = config.birkenstockalert.alertMsg;
const fromSms = config.birkenstockalert.fromSms;
const toSms = config.birkenstockalert.toSms;

const url = 'https://www.dsw.com/en/us/product/birkenstock-arizona-slide-sandal---womens/171995';
const uA = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0';
const sizes = {
  'size\nEU 38 / US 7-7.5\nof Product Arizona Slide Sandal - Women\'s - Not Selected': true,
  'size\nEU 39 / US 8-8.5\nof Product Arizona Slide Sandal - Women\'s - Not Selected': true,
};

const birkenStockAlert = functions.pubsub.schedule('every 3 hours')
    .onRun(async (context) => {
      const browser = await puppeteer.launch();

      // set up page
      const page = await browser.newPage();
      await page.setViewport({width: 1280, height: 720});
      await page.setUserAgent(uA);
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

      // send a text notification if the shoes are in stock
      if (desiredSizes.length > 0) {
        console.log('shoes in size/color are in stock');

        const body = `${alertMsg}\n${url}`;

        await client.messages.create({body, from: fromSms, to: toSms});
      } else {
        console.log('shoes in size/color not in stock');
      }

      await browser.close();
    });

module.exports = birkenStockAlert;
