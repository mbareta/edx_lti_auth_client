const express = require('express');
const router = express.Router();
const lti = require('ims-lti');

RedisNonceStore = require('../node_modules/ims-lti/lib/redis-nonce-store.js');
client = require('redis').createClient();
store = new RedisNonceStore('key', client);

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// render LTI component
router.post('/', (req, res, next) => {
  provider = new lti.Provider('key', 'secret', store);
  provider.valid_request(req, (err, isValid) => {
    if(isValid) {
      req.session.ltiUserId = provider.userId;
      res.render('index', { title: 'Success', email: provider.userId });
    }
    else {
      res.render('index', { title: 'Error', email: provider.username });
    }
  });
});

// submit from LTI component
router.post('/submit', (req, res, next) => {
  provider = new lti.Provider('key', 'secret', store);
  res.render('index', { title: 'Sumbitted', email: req.session.ltiUserId });
});

module.exports = router;
