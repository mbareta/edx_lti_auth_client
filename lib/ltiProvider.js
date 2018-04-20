const lti = require('ims-lti');
const config = require('../config');
const RedisNonceStore = require('../node_modules/ims-lti/lib/redis-nonce-store.js');
const client = require('redis').createClient(config.redisUrl);

const store = new RedisNonceStore('lti-key', client);

const provider = new lti.Provider(config.lti.key, config.lti.secret, store);

module.exports = Promise.promisifyAll(provider);
