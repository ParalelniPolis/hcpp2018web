var moment = require('moment-timezone');
var _ = require('lodash');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET page. */

var pageTitle = 'Schedule';
var hashTitle = '#HCPP18';
var pageDescription = 'Hackers Congress Paralelní Polis is one of the premier events for hackers, artists, activists, libertarians, and cryptoenthusiasts in Europe.';

var formatApiData = function(talks) {
  var scheduleData = talks.map(function(event) {
    event.groupDate = moment(event.starts).format('DD-MM-YYYY');

    return event;
  });

  return _.groupBy(scheduleData, 'groupDate');
};

var requestBody = {
  operationName:"talksQuery",
  query:"query talksQuery { allTalks(filter: {status: ACTIVE}, orderBy: starts_ASC) { id name description starts ends room{ id name } speakers(filter: {status: ACTIVE}){ id displayName photo{ id url } } } }",
  variables:{}
};

router.get('/', function(req, res) {

  fetch(process.env.GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(requestBody)
  }).then(function (data) {
    return data.json();
  }).then(function(talks) {
    var schedule = formatApiData(talks.data.allTalks);

    res.render('schedule', {
      protocol: req.protocol,
      hostname: req.hostname,
      path: req.originalUrl,
      title: pageTitle,
      title_hash: hashTitle,
      description: pageDescription,
      day1: schedule['06-10-2017'],
      day2: schedule['07-10-2017'],
      day3: schedule['08-10-2017']
    });

  }).catch(function(error) {
    throw error;
  });
});

module.exports = router;
