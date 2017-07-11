const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request').defaults({ jar: true }));
const config = require('../config/main');
const edxCourseApi = require('../lib/edxCourseApi');

const getUserInfo = (req, res, next) => {
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
  })
  .then(next)
  .catch(error => res.send(`Access Token Error ${error.message}`));
};

const getUserProfile = (req, res, next) => {
  const accessToken = req.session.token.access_token;
  const options = {
    url: `${config.lmsUrl}/api/user/v1/accounts/${req.session.user.preferred_username}`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  return request.getAsync(options)
  .then(response => {
    req.session.profile = JSON.parse(response.body);
  })
  .then(next);
};

const cacheUserXBlocks = (req, res) => {
  // cache all user blocks in session
  edxCourseApi.getAllUserBlocks(req)
  .then(blocks => { req.session.blocks = blocks; })
  .then(() => res.redirect(req.session.redirectToUrl || '/'));
};

module.exports = {
  getUserInfo,
  getUserProfile,
  cacheUserXBlocks
};
