// polyfill
if (!Object.prototype.values) {
  global.Object = Object.assign(
    Object,
    { values: require('object.values') } // eslint-disable-line global-require
  );
}
global.Promise = require('bluebird');

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const config = require('./config/main');

const index = require('./routes/index');
const users = require('./routes/users');
const lti = require('./routes/lti/index');
const ltiForm = require('./routes/lti/form');
const apiResponses = require('./routes/api/responses');
const { storeRequestOriginUrl, redirectAnonymous } = require('./middlewares/general');
const {
  excludesRequestRoute,
  skipWhitelistedRoutes,
  intercept,
  getEmailFromSession
} = require('./lib/helpers');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.locals.config = config;

// HTTPS proxy magic
app.enable('trust proxy');

app.use(favicon(path.join(__dirname, 'public', 'assets', 'images', 'favicon.ico')));
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

const ignoreOnRedirectRoutes = (['/users/auth', '/users/login', '/users/excludesRequestRoutelogout', '/favicon.ico']);
app.use(intercept(excludesRequestRoute(ignoreOnRedirectRoutes), storeRequestOriginUrl));

app.use(skipWhitelistedRoutes(redirectAnonymous));

app.use((req, _, next) => {
  app.locals.email = req.email = getEmailFromSession(req);
  app.locals.profile = req.session.profile;
  next();
});

// routes
app.use('/', index);
app.use('/users', users);
app.use('/lti', lti);
app.use('/lti/form', ltiForm);
app.use('/api/responses', apiResponses);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('404: Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
