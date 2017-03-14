const express = require('express');
const db = require('../models/index');
const { getUserInfo } = require('../middlewares/auth');
const config = require('../config/main');

const router = express.Router();
const loginUrl = `${config.baseUrl}:${config.portfolioPort}/users/login`;
const redirectOnLoginUrl = `${config.baseUrl}:${config.portfolioPort}`;
const lmsUrl = `${config.baseUrl}:${config.lmsPort}`;
const edxLogoutUrl = `${config.baseUrl}:${config.lmsPort}/logout`;
const { authorize, storeAccessToken, logout } = require('edx-oauth-middleware').init({
  loginUrl,
  redirectOnLoginUrl,
  lmsUrl,
  edxLogoutUrl,
  client: config.client,
  auth: config.auth
});

/* GET users listing. */
router.get('/', (req, res) =>
  db.User.findOne().then(user => res.send(user))
);

router.get('/auth', authorize);

router.get('/login', storeAccessToken, getUserInfo);

router.get('/logout', logout);

module.exports = router;
