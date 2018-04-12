var express = require('express');
var router = express.Router();
var multer  = require('multer')();
var nodemailer = require('nodemailer');

var emailUser = process.env.EMAIL_USER;
var emailPass = process.env.EMAIL_PASS;
var destinationAddress = process.env.DESTINATION_ADDRESS;

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://'+ emailUser +'%40gmail.com:'+ emailPass +'@smtp.gmail.com');

router.post('/', [multer.array(), recaptcha.middleware.verify], function(req, res) {

  if (req.recaptcha.error) {
    if (req.body.type === 'fetch') {
      console.log(req.recaptcha.error);
      return res.json({
        contactFormMsg: 'There was an error sending mail. ' + req.recaptcha.error
      });
    }
    else {
      console.log(req.recaptcha.error);
      req.session.contactErrorMsg = req.recaptcha.error;
      return res.redirect('/?contact=error');
    }
  }

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: '"'+ req.body.name +'" <'+ req.body.email +'>', // sender address
    to: destinationAddress, // list of receivers
    subject: 'Contact form HCPP18 - ' + req.body.subject, // Subject line
    text: 'Name: ' + req.body.name + '\n'
      + 'Company: ' + req.body.company + '\n'
      + 'E-mail: ' + req.body.email + '\n'
      + 'Subject: ' + req.body.subject + '\n\n'
      + 'Message: ' + '\n'
      + req.body.message // plaintext body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if (error){
      if (req.body.type === 'fetch') {
        console.log(error);
        res.json({
          contactFormMsg: 'There was an error sending mail. ' + error
        });
      }
      else {
        console.log(error);
        req.session.contactErrorMsg = error;
        res.redirect('/?contact=error');
      }
    }
    else {
      if (req.body.type === 'fetch') {
        console.log('Message sent: ' + info.response);
        res.json({
          contactFormMsg: 'Your message was successfully sent! We will contact you soon.'
        });
      }
      else {
        console.log('Message sent: ' + info.response);
        res.redirect('/?contact=success');
      }
    }
  });
});

module.exports = router;
