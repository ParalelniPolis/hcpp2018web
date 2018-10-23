const express = require('express');
const router = express.Router();

/* GET home page. */

const hashTitle = '#HCPP18';
const pageDescription = 'Hackers Congress Paralelní Polis is one of the premier events for hackers, artists, activists, libertarians, and cryptoenthusiasts in Europe.';
const includeHeader = true;

router.get('/', recaptcha.middleware.render, async (req, res) => {
  let mailchimpMessage = null;

  if (req.query.subscribe === 'success') {
    mailchimpMessage = 'You subscribed successfully! Look for the confirmation email.';
  }
  else if (req.query.subscribe === 'error') {
    mailchimpMessage = `There was an error subscribing user. ${req.session.subscribeErrorMsg}`;
  }

  let contactMessage = null;

  if (req.query.subscribe === 'success') {
    contactMessage = 'Your message was successfully sent! We will contact you soon.';
  }
  else if (req.query.subscribe === 'error') {
    contactMessage = `There was an error sending message. ${req.session.contactErrorMsg}`;
  }

    return res.render('index', {
      protocol: req.protocol,
      hostname: req.hostname,
      path: req.originalUrl,
      title_hash: hashTitle,
      description: pageDescription,
      include_header: includeHeader,
      mailchimp_message: mailchimpMessage,
      contact_message: contactMessage,
      captcha: req.recaptcha
    });
});

module.exports = router;
