module.exports = {
  mongoUrl: process.env.MONGO_URL,
  baseUrl: process.env.BASE_URL,
  lmsUrl: process.env.LMS_URL,
  client: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET
  },
  auth: {
    tokenHost: process.env.AUTH_TOKEN_HOST,
    authorizePath: process.env.AUTH_AUTHORIZE_PATH,
    tokenPath: process.env.AUTH_TOKEN_PATH
  },
  lti: {
    key: process.env.LTI_KEY,
    secret: process.env.LTI_SECRET
  },
  cookieSecret: process.env.COOKIE_SECRET,
  cookieMaxAge: 35000000,
  whitelistRoutes: ['/users/auth', '/users/login'],
  googleAnalyticsAccount: process.env.GOOGLE_ANALYTICS_ACCOUNT,
  bugmuncherApiKey: process.env.BUGMUNCHER_API_KEY,
  redisUrl: process.env.REDIS_URL,
  uploadLimit: '4.13mb'
};
