'use strict';

const functions = require('firebase-functions');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const boof = functions.https.onRequest((req, res) => {
  const twiml = new MessagingResponse();

  const requestMessage = req.body.Body ? req.body.Body.toLowerCase() : '';
  const responseMessage = buildResponse(requestMessage);

  twiml.message(responseMessage);
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

const buildResponse = (requestMessage) => {
  let responseMessage =
   'Grrrrr...\n(Try a command like "boof", "bork", or "shake")';

  if (requestMessage.includes('boof')) {
    responseMessage = 'Bork! 🐶';
  } else if (requestMessage.includes('bork')) {
    responseMessage = 'Boof! 🐶';
  } else if (requestMessage.includes('shake')) {
    responseMessage = '🐾';
  }

  return responseMessage;
};

module.exports = boof;
