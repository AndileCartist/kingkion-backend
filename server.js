const express = require('express');
const payload = require('payload');

require('dotenv').config();
const app = express();

const { config,} = require("./config");
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport(config);

payload.init({
  secret: process.env.PAYLOAD_SECRET,
  mongoURL: process.env.MONGODB_URI,
  license: process.env.PAYLOAD_LICENSE_KEY,
  email: {
    fromName: 'Admin',
    fromAddress: 'admin@example.com',
    transport
  },
  express: app,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  },
});
app.listen(process.env.PORT || 3000);