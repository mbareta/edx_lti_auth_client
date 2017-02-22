// @flow

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const config = require('./config/main').get();

const index = require('./routes/index');
const users = require('./routes/users');
const lti = require('./routes/lti/index');
const ltiForm = require('./routes/lti/form');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.locals.config = config;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// TODO: check what is express session secret
// and replace keyboard cat with something normal
app.use(session({
  secret: config.cookieSecret,
  cookie: { maxAge: config.cookieMaxAge },
  store: new RedisStore()
}));
app.use(skipRoutes(config.whitelistRoutes, redirectAnonymous));

app.use((req, _, next) => {
  app.locals.email = req.email = getEmailFromSession(req);
  next();
});

// routes
app.use('/', index);
app.use('/users', users);
app.use('/lti', lti);
app.use('/lti/form', ltiForm);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, _) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function skipRoutes(routes: Array<string>, middleware: Function) {
  return (req, res, next) => {
    if(routes.some(route => route === req.path)) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
}

function redirectAnonymous(req, res, next) {
  if (getEmailFromSession(req)) {
    next();
  } else {
    res.redirect('/users/auth');
  }
}

function getEmailFromSession(req) {
  const oauthEmail = req.session.user && req.session.user.email;
  const ltiEmail = req.session.lti && req.session.lti.email;

  return oauthEmail || ltiEmail || undefined;
}

module.exports = app;
