const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request').defaults({jar: true}));

const config = require('../config/main').get();
const serverBaseUrl = config.baseUrl;
const portfolioPort = config.portfolioPort;
const lmsPort = config.lmsPort;

const credentials = {
  client: config.client,
  auth: config.auth
};
const oauth2 = require('simple-oauth2').create(credentials);

module.exports.authorize = (req, res, _) => {
  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: `${serverBaseUrl}:${portfolioPort}/users/login`,
    scope: 'openid profile email',
    // state: '<state>'
  });
  res.redirect(authorizationUri);
};

module.exports.getAccessToken = (req, res, next) => {
  const tokenConfig = {
    code: req.query.code,
    redirect_uri: `${serverBaseUrl}:${portfolioPort}`
  };

  oauth2.authorizationCode.getToken(tokenConfig)
  .then(result => {
    req.session.authToken = oauth2.accessToken.create(result);
    const accessToken = req.session.authToken.token.access_token;
    let options = {
      url: `${serverBaseUrl}:${lmsPort}/oauth2/user_info`,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    };
    
    return request.getAsync(options);
  })
  .then((response) => {
    req.session.user = JSON.parse(response.body);
    res.redirect('/');
  })
  .catch(error => {
    res.send(`Access Token Error ${error.message}`)
  });
};

module.exports.logout = (req, res, _) => {
  req.session.destroy();
  if(req.params.query && req.params.query.no_redirect) {
    res.send('OK');
  }
  else {
    res.redirect(`${serverBaseUrl}:${lmsPort}/logout`);
  }
};

// Password Credentials Flow
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
