const express = require('express');
const { getUserInfo, cacheUserXBlocks, setUserCookies } = require('../middlewares/auth');
const config = require('../config/main');

const router = express.Router();
const loginUrl = `${config.baseUrl}/users/login`;
const redirectOnLoginUrl = `${config.baseUrl}`;
const lmsUrl = `${config.lmsUrl}`;
const edxLogoutUrl = `${config.lmsUrl}/logout`;
const { authorize, storeAccessToken, logout } = require('edx-oauth-middleware').init({
  loginUrl,
  redirectOnLoginUrl,
  lmsUrl,
  edxLogoutUrl,
  client: config.client,
  auth: config.auth
});

router.get('/auth', authorize);

router.get('/login', storeAccessToken, cacheUserXBlocks, setUserCookies, getUserInfo);

router.get('/logout', logout);

module.exports = router;
