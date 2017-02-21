//@flow

const express = require('express');
const router = express.Router();
const db = require('../models/index');
const request = require('request').defaults({jar: true});

const config = require('../config/main').get();
const serverBaseUrl = config.baseUrl;
const lmsPort = config.lmsPort
const portfolioPort = config.portfolioPort

const credentials = {
  client: config.client,
  auth: config.auth
};
const oauth2 = require('simple-oauth2').create(credentials);

/* GET users listing. */
router.get('/', (req, res, _) => 
  db.User.findOne().then((user: User) => res.send(user))
);

router.get('/auth', (req, res, _) => {
  // Authorization oauth2 URI
  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: `${serverBaseUrl}:${portfolioPort}/users/login`,
    scope: 'openid profile email',
    // state: '<state>'
  });

  // Redirect example using Express (see http://expressjs.com/api.html#res.redirect)
  res.redirect(authorizationUri);

  // const tokenConfig = {
  //   username: 'honor@example.com',
  //   password: 'edx'
  // };

  // oauth2.ownerPassword.getToken(tokenConfig).then((result) => {
  //   // const token = oauth2.accessToken.create(result);
  //   // res.send(token);
  //   request.post('http://localhost:8000/oauth2/login/', {form: {access_token: result.access_token}}, function(error, response, body){
  //     req.session.edxCookies = response.headers['set-cookie'];
  //     res.set('Set-Cookie', response.headers['set-cookie']);
  //     res.send(response.headers['set-cookie']);
  //   });
  // });
});

router.get('/login', (req, res, _) => {
  // Get the access token object (the authorization code is given from the previous step).
  console.log('req.params.code', req.query.code);
  const tokenConfig = {
    code: req.query.code,
    redirect_uri: `${serverBaseUrl}:${portfolioPort}`
  };

  // Callbacks
  // Save the access token
  oauth2.authorizationCode.getToken(tokenConfig, (error, result) => {
    if (error) {
      res.send('Access Token Error ' + error.message);
    }
    else {
     const token = oauth2.accessToken.create(result);
     req.session.authToken = token;
     res.redirect('info');
    }
  });
});

router.get('/logout', (req, res, _) => {
  req.session.destroy();
  res.redirect('http://localhost:8000/logout');
});

router.get('/info', (req, res, _) => {
  const token = req.session.authToken.token.access_token;
  request.get({url: `${serverBaseUrl}:${lmsPort}/oauth2/user_info`, headers: {'Authorization': `Bearer ${token}`}} , (error, response, body) => {
    res.set('Content-Type', 'application/json');
    res.send(body);
  });
});

router.get('/courses', (req, res, _) => {
  request.cookie = req.session.edxCookies;
  request.get({url: `${serverBaseUrl}/api/courses/v1/courses`, headers: {'Accept': 'application/json'}} , (error, response, body) => {
    res.set('Content-Type', 'application/json');
    res.send(body);
  });
});

module.exports = router;
