var express = require('express');
var router = express.Router();

/* GET page. */

var pageTitle = 'Postcard for Ross Ulbricht';
var hashTitle = '#HCPP18';
var pageDescription = 'Show your respect to Ross Ulbricht, the most influential crypto-anarchist and the victim of the government’s inhumane persecution of free-minded people.';

router.get('/', function(req, res) {
  res.render('ross', {
    protocol: req.protocol,
    hostname: req.hostname,
    path: req.originalUrl,
    title: pageTitle,
    title_hash: hashTitle,
    description: pageDescription
  });
});

module.exports = router;
