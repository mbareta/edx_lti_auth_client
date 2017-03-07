const Promise = require('bluebird');
const lti = require('ims-lti');
const config = require('../config/main');
const RedisNonceStore = require('../node_modules/ims-lti/lib/redis-nonce-store.js');
const client = require('redis').createClient();
const store = new RedisNonceStore('lti-key', client);

const provider = new lti.Provider(config.lti.key, config.lti.secret, store);

module.exports = Promise.promisifyAll(provider);
