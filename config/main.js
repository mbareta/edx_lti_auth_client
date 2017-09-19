const env = require('./config.json');

module.exports = (() => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const envVariables = env[nodeEnv];

  // OAuth2
  envVariables.client.id = process.env.CLIENT_ID || envVariables.client.id;
  envVariables.client.secret = process.env.CLIENT_SECRET || envVariables.client.secret;

  // LTI
  envVariables.lti.key = process.env.LTI_KEY || envVariables.lti.key;
  envVariables.lti.secret = process.env.LTI_SECRET || envVariables.lti.secret;

  return envVariables;
})();
