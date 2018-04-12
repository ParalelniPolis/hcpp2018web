var express = require('express');
var router = express.Router();
var multer  = require('multer')();

router.post('/', multer.array(), function(req, res) {
  mc.lists.subscribe({
    id: req.body.list_id,
    email: {
      email: req.body.email
    },
    merge_vars: {
        groupings: [{
            name: 'Event',
            groups: ['HCPP18']
        }]
    },
    update_existing: true,
    replace_interests: false
    },
    function(data) {
      if (req.body.type === 'fetch') {
        res.json({
          subscribeMsg: 'You subscribed successfully! Look for the confirmation email.'
        });
      }
      else {
        res.redirect('/?subscribe=success');
      }
    },
    function(error) {
      if (req.body.type === 'fetch') {
        res.json({
          subscribeMsg: 'There was an error subscribing user. ' + error.error
        });
      }
      else {
        if (error.error) {
          console.log(error.code + ": " + error.error);
          req.session.subscribeErrorMsg = error.error;
        }
        res.redirect('/?subscribe=error');
      }
    });
});

module.exports = router;
