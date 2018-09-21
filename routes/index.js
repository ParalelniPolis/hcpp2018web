const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const moment = require('moment-timezone');

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

  const requestBody = {
    operationName:"speakersQuery",
    query:`query speakersQuery($time: DateTime) {
              allSpeakers(
                filter: {status: ACTIVE},
                orderBy: position_ASC
              ) {
                id
                displayName
                shortDescription
                longDescription
                position
                photo{ url }
                talks(filter: {status: ACTIVE})
                  {
                    name
                    description
                    starts
                    ends
                    room{ name }
                  }
                }
              allTalks(
                filter: {status: ACTIVE, starts_gt: $time},
                orderBy: starts_ASC, first: 3
              ) {
              name
              description
              starts
              ends
              room{ name }
              speakers{
                displayName
                photo{ url }
              }
            }
          }`,
    variables:{
      time: moment.tz('Europe/Prague').format()
    }
  };

  try {
    const data = await fetch(process.env.GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(requestBody)
    });
    const queryData = await data.json();
    const speakerRows = [];

    while (queryData.data.allSpeakers.length) {
      speakerRows.push(queryData.data.allSpeakers.splice(0, 4));
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
      speakerRows: speakerRows,
      smallSchedule: queryData.data.allTalks,
      captcha: req.recaptcha
    });
  } catch (e) {
    throw e;
  }
});

module.exports = router;
