/* eslint max-len: "off" */
'use strict';

const functions = require('firebase-functions');

const schedule = process.env.BIRKENSTOCKALERT_SCHEDULE || functions.config().puppybot.birkenstockalert.schedule || '5 * /3 * * *';
const sms = process.env.BIRKENSTOCKALERT_SMS || functions.config().puppybot.birkenstockalert.sms || null;
const timezone = process.env.BIRKENSTOCKALERT_TIMEZONE || functions.config().puppybot.birkenstockalert.timezone || 'America/Chicago';
const url = process.env.BIRKENSTOCKALERT_URL || functions.config().puppybot.birkenstockalert.url || null;

const birkenstockalert = {schedule, sms, timezone, url};

const config = {birkenstockalert};

module.exports = config;
