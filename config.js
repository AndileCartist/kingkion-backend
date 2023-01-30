require("dotenv").config();
const config = {
  host: process.env.SMTP_SERVER || "smtp-relay.sendinblue.com",
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_LOGIN,
    pass: process.env.SMTP_PASSWORD,
  },
};

module.exports = {
  config,
};
