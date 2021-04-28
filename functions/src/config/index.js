/* eslint max-len: "off" */
'use strict';

const functions = require('firebase-functions');

const alertMsg = process.env.BIRKENSTOCKALERT_ALERTMSG || functions.config().puppybot.birkenstockalert.alertmsg || null;
const fromSms = process.env.BIRKENSTOCKALERT_FROMSMS || functions.config().puppybot.birkenstockalert.fromsms || null;
const toSms = process.env.BIRKENSTOCKALERT_TOSMS || functions.config().puppybot.birkenstockalert.tosms || null;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID || functions.config().puppybot.birkenstockalert.twilioaccountsid || null;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN || functions.config().puppybot.birkenstockalert.twilioauthtoken || null;

const birkenstockalert = {alertMsg, fromSms, toSms, twilioAccountSid, twilioAuthToken};

const config = {birkenstockalert};

module.exports = config;
