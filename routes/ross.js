const express = require('express');
const router = express.Router();

/* GET page. */

const pageTitle = 'Postcard for Ross Ulbricht';
const hashTitle = '#HCPP18';
const pageDescription = 'Show your respect to Ross Ulbricht, the most influential crypto-anarchist and the victim of the government’s inhumane persecution of free-minded people.';

router.get('/', (req, res) => {
  return res.render('ross', {
    protocol: req.protocol,
    hostname: req.hostname,
    path: req.originalUrl,
    title: pageTitle,
    title_hash: hashTitle,
    description: pageDescription
  });
});

module.exports = router;
