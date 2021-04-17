'use strict';

const functions = require('firebase-functions');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const boof = functions.https.onRequest((req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('Bork!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

module.exports = boof;
