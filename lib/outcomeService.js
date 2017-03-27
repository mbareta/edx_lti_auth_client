const Promise = require('bluebird');
const OutcomeService = require('ims-lti').OutcomeService;
const config = require('../config/main');

function outcomeServiceFactory (url, sourcedId) {
  return Promise.promisifyAll(new OutcomeService({
    consumer_key: config.lti.key,
    consumer_secret: config.lti.secret,
    service_url: url,
    source_did: sourcedId
  }));
}
module.exports = outcomeServiceFactory;
