const express = require('express');
const { getUserInfo, cacheUserXBlocks, setUserCookies } = require('../middlewares/auth');
const config = require('../config/main');

const router = express.Router();

const { authorize, storeAccessToken, logout } = require('edx-oauth-middleware').init({
  loginUrl: `${config.baseUrl}/users/login`,
  redirectOnLoginUrl: config.baseUrl,
  lmsUrl: config.lmsUrl,
  edxLogoutUrl: `${config.lmsUrl}/logout`,
  client: config.client,
  auth: config.auth
});

router.get('/auth', authorize);

router.get('/login', storeAccessToken, cacheUserXBlocks, setUserCookies, getUserInfo);

router.get('/logout', logout);

module.exports = router;
