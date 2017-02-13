var request = require('request');

var edXOAuth = {
  login: function(){
    data = {
      form:{
        client_id: 'id',
        client_secret: 'secret',
        username: 'honor@example.com',
        password: 'edx',
        grant_type: 'password'
      }
    }
    var url = 'http://localhost:8000/oauth2/access_token/';
    request.post(url, data, function(error, response, body){
      var url = 'http://localhost:8000/oauth2/login/';
      var data = {
        form: {
          access_token: body.access_token
        }
      };

      request.post(url, data, function(error, response, body){
        return response;
      });
    });
  }
}

module.exports = edXOAuth;
