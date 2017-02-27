//@flow

const express = require('express');
const router = express.Router();
const db = require('../models/index');
const request = require('request').defaults({jar: true});
const {authorize, getAccessToken} = require('../middlewares/auth');
const config = require('../config/main').get();
const serverBaseUrl = config.baseUrl;
const lmsPort = config.lmsPort;
const portfolioPort = config.portfolioPort;

const credentials = {
  client: config.client,
  auth: config.auth
};
const oauth2 = require('simple-oauth2').create(credentials);

/* GET users listing. */
router.get('/', (req, res, _) =>
  db.User.findOne().then((user: User) => res.send(user))
);

router.get('/auth', authorize);

router.get('/login', getAccessToken);

router.get('/logout', (req, res, _) => {
  req.session.destroy();
  if(params.query && params.query.no_redirect) {
    res.send('OK');
  }
  else {
    res.redirect(`${serverBaseUrl}:${lmsPort}/logout`);
  }
});

// router.get('/courses', (req, res, next) => {
//   request.cookie = req.session.edxCookies;
//   request.get({url: `${serverBaseUrl}/api/courses/v1/courses`, headers: {'Accept': 'application/json'}} , (error, response, body) => {
//     res.set('Content-Type', 'application/json');
//     res.send(body);
//   });
// });

module.exports = router;
