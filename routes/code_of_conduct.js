var express = require('express');
var router = express.Router();

/* GET page. */

var pageTitle = 'Code of Conduct';
var hashTitle = '#HCPP18';
var pageDescription = 'Hackers Congress Paralelní Polis is one of the premier events for hackers, artists, activists, libertarians, and cryptoenthusiasts in Europe.';

router.get('/', function(req, res) {
  res.render('code_of_conduct', {
    protocol: req.protocol,
    hostname: req.hostname,
    path: req.originalUrl,
    title: pageTitle,
    title_hash: hashTitle,
    description: pageDescription
  });
});

module.exports = router;
