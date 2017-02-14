var express = require('express');
var router = express.Router();
var db = require('../models/index');
var request = require('request').defaults({jar: true});

var serverBaseUrl = 'http://54.208.243.8';
// var serverBaseUrl = 'http://localhost';

const credentials = {
  client: {
    id: 'id',
    secret: 'secret'
  },
  auth: {
    tokenHost: serverBaseUrl,
    tokenPath: '/oauth2/access_token/',
    authorizePath: '/oauth2/authorize'
  }
};
const oauth2 = require('simple-oauth2').create(credentials);

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.User.findOne().then(function (user) {
    res.send(user);
  });
});

router.get('/auth', function(req, res, next){
  // Authorization oauth2 URI
  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: `${serverBaseUrl}:3000/users/login`,
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

router.get('/login', function(req, res, next){
  // Get the access token object (the authorization code is given from the previous step).
  console.log('req.params.code', req.query.code);
  const tokenConfig = {
    code: req.query.code,
    redirect_uri: `${serverBaseUrl}:3000`
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

router.get('/info', function(req, res, next) {
  var token = req.session.authToken.token.access_token;
  request.get({url: `${serverBaseUrl}:8000/oauth2/user_info`, headers: {'Authorization': `Bearer ${token}`}} , function(error, response, body){
    res.set('Content-Type', 'application/json');
    res.send(body);
  });
});

router.get('/courses', function(req, res, next){
  request.cookie = req.session.edxCookies;
  request.get({url: `${serverBaseUrl}:8000/api/courses/v1/courses`, headers: {'Accept': 'application/json'}} , function(error, response, body){
    res.set('Content-Type', 'application/json');
    res.send(body);
  });
});

module.exports = router;
