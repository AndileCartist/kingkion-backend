const express = require('express');
const payload = require('payload');

require('dotenv').config();
const app = express();

// Initialize Payload
payload.init({
  secret: process.env.PAYLOAD_SECRET,
  mongoURL: process.env.MONGODB_URI,
  license: process.env.PAYLOAD_LICENSE_KEY,
  email: {
    transportOptions: {
      host: 'smtp.gmail.com',
      auth: {
        user: 'andilemkhizekhabazela@gmail.com',
        pass: 'ziqsvzdomayrzrtv',
      },
      port: 587,
      secure: false, // use TLS
    },
    fromName: "King Koins",
    fromAddress: "kingkoins@gmail.com",
  },
  express: app,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  },
});

// Add your own express routes here

app.listen(process.env.PORT || 3000);