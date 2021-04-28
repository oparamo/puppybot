'use strict';

const functions = require('firebase-functions');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const recentNumbers = {};

const boof = functions.https.onRequest((req, res) => {
  const response = buildTwimlResponse(req.body.Body, req.body.From);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(response.toString());
});

const buildTwimlResponse = (textBody, fromNumber) => {
  const response = new MessagingResponse();
  const message = response.message();

  const isABother = isDoingABother(fromNumber);
  const requestMessage = textBody ? textBody.toLowerCase() : '';

  let messageBody =
    'Grrrrr...\n(Try a command like "boof", "bork", or "shake")';

  if (isABother) {
    messageBody =
      'You\'re doing me a bother, you can talk to me again after my nap... 💤😴💤';

    message.media('https://bittersweet-earwig-8551.twil.io/assets/nap.JPEG');
  } else if (requestMessage.includes('boof')) {
    messageBody = 'Bork! 🐶';
  } else if (requestMessage.includes('bork')) {
    messageBody = 'Boof! 🐶';
  } else if (requestMessage.includes('shake')) {
    messageBody = '🐾';
  }

  message.body(messageBody);

  return response;
};

const isDoingABother = (fromNumber) => {
  let messageCount = recentNumbers[fromNumber] || 0;

  messageCount = messageCount + 1;
  recentNumbers[fromNumber] = messageCount;

  return messageCount > 4;
};

module.exports = boof;
