const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request').defaults({ jar: true }));
const config = require('../config/main');
const edxCourseApi = require('../lib/edxCourseApi');

const getUserInfo = (req, res) => {
  const accessToken = req.session.token.access_token;
  const options = {
    url: `${config.lmsUrl}/oauth2/user_info`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  request.getAsync(options)
  .then(response => {
    req.session.user = JSON.parse(response.body);
    res.redirect(req.session.redirectToUrl || '/');
  })
  .catch(error => res.send(`Access Token Error ${error.message}`));
};

const cacheUserXBlocks = (req, res, next) => {
  // cache all user blocks in session
  edxCourseApi.getAllUserBlocks(req)
  .then(blocks => { req.session.blocks = blocks; })
  .then(next);
};

module.exports = {
  getUserInfo,
  cacheUserXBlocks
};
