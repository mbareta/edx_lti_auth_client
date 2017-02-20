const express = require('express');
const router = express.Router();
const mongoConnectionPool = require('../../lib/mongoConnectionPool');
const ltiProvider = require('../../lib/ltiProvider');

// view results
router.get('/', (req, res, next) => {
  const email = getEmail(req);

  mongoConnectionPool.db.collection('form_responses').find({email: email}).toArray()
    .then(results => res.render('lti/form/index', {email: email, results: results}));
});

router.post('/', (req, res, next) => {
  ltiProvider.valid_request(req, (err, isValid) => {
    if(isValid) {
      req.session.lti = {
        email: ltiProvider.body.lis_person_contact_email_primary,
        username: ltiProvider.username,
        id: ltiProvider.userId
      }

      res.render('lti/form/form', {email: req.session.lti.email});
    }
    else {
      throw new Error('Not Authorized');
    }
  });
});

router.post('/submit', (req, res, next) => {
  const email = getEmail(req);
  mongoConnectionPool.db.collection('form_responses')
    .insertOne({text: req.body.text, email: email})
    .then(result => res.redirect('/lti/form'));
});

function getEmail(req) {
  const email = req.session.lti && req.session.lti.email;
  if(email) {
    return email
  }
  else {
    throw new Error('Not Authorized')
  }
}

module.exports = router;
