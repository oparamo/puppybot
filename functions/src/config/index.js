/* eslint max-len: "off" */
'use strict';

const functions = require('firebase-functions');

const alertSchedule = functions.config().puppybot.birkenstockalert.schedule || process.env.BIRKENSTOCKALERT_SCHEDULE || '5 * /3 * * *';
const alertSMS = functions.config().puppybot.birkenstockalert.sms || process.env.BIRKENSTOCKALERT_SMS || null;
const alertURL = functions.config().puppybot.birkenstockalert.url || process.env.BIRKENSTOCKALERT_URL || null;
const timeZone = functions.config().puppybot.birkenstockalert.timeZone || process.env.BIRKENSTOCKALERT_TIMEZONE || 'America/Chicago';

const config = {alertSchedule, alertSMS, alertURL, timeZone};

module.exports = config;
