require('dotenv').config({silent: true});

const express = require('express');
const compression = require('compression');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const helpers = require('handlebars-helpers')();
const mcapi = require('mailchimp-api/mailchimp');
const helmet = require('helmet');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const moment = require('moment-timezone');
const slugify = require('slugify');
recaptcha = require('express-recaptcha');

// routes
const indexRoute = require('./routes/index');
const conductRoute = require('./routes/code_of_conduct');
const subscribeRoute = require('./routes/subscribe');
const contactRoute = require('./routes/contact');
const scheduleRoute = require('./routes/schedule');
const rossRoute = require('./routes/ross');

const app = express();

// set enviroment variable
const env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env === 'development';
app.locals.APP_NAME = 'Hackers Congress Paralelní Polis 2018';

const sessionSecret = process.env.SESSION_SECRET;

if (typeof sessionSecret === 'undefined') {
  throw new Error('Session key is not set');
}

// init recaptcha
recaptcha.init(process.env.CAPTCHA_SITE_KEY, process.env.CAPTCHA_SECRET_KEY);

// compress all requests
app.use(compression());

// security middleware
app.use(helmet());

// set MailChimp API key here
mc = new mcapi.Mailchimp(process.env.MAILCHIMP_KEY || undefined);

// view engine setup

helpers.moment = function(date, format) {
  return moment.tz(date, 'Europe/Prague').format(format);
};

helpers.breaklines = function(text) {
  text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
  return text;
};

helpers.slugify = function(text) {
  return slugify(text, {
    replacement: '-',    // replace spaces with replacement
    remove: /[$*_+~.()'"!\-:@]/g,        // regex to remove characters
    lower: true          // result in lower case
  });
};

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  partialsDir: ['views/partials/'],
  helpers: helpers
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(favicon(__dirname + '/assets/media/favicon/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser(sessionSecret));
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  })
}));
app.use(express.static(path.join(__dirname, 'assets'), { maxAge: 31536000 }));

app.use('/', indexRoute);
app.use('/code-of-conduct', conductRoute);
app.use('/subscribe', subscribeRoute);
app.use('/contact', contactRoute);
app.use('/schedule', scheduleRoute);
app.use('/ross', rossRoute);

// redirect old address
app.get('/eng', function(req, res) {
  res.redirect('/');
});

// redirect /en addres
app.get('/en', function(req, res) {
  res.redirect('/');
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
