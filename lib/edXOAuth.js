var request = require('request');

var edXOAuth = {
  login: () => {
    data = {
      form:{
        client_id: 'id',
        client_secret: 'secret',
        username: 'honor@example.com',
        password: 'edx',
        grant_type: 'password'
      }
    }
    const url = 'http://localhost:8000/oauth2/access_token/';
    request.post(url, data, (error, response, body) => {
      const url = 'http://localhost:8000/oauth2/login/';
      const data = {
        form: {
          access_token: body.access_token
        }
      };

      request.post(url, data, (error, response, body) => response);
    });
  }
}

module.exports = edXOAuth;
