'use strict';

const config = require('../config');

const functions = require('firebase-functions');

const birkenStockAlert = functions.pubsub.schedule(config.alertSchedule)
    .timeZone(config.timeZone)
    .onRun((context) => {
      console.log('This will be run every 5 minutes after every 3rd hour!');
      return null;
    });

module.exports = birkenStockAlert;
