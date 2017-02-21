const express = require('express');
const router = express.Router();
const mongoConnectionPool = require('../../lib/mongoConnectionPool');
const ltiProvider = require('../../lib/ltiProvider');
const mongoDbName = 'form_responses';
const componentLocation = 'lti/form';

// view results
router.get('/', (req, res, _) => {
  const email = getEmail(req);

  mongoConnectionPool.db.collection(mongoDbName).find({email: email}).toArray()
    .then(results => res.render(`${componentLocation}/index`, {email: email, results: results}));
});

// LTI view
router.post('/', (req, res, _) => {
  // validate LTI request
  ltiProvider.valid_request(req, (err, isValid) => {
    if(isValid) {
      // store user data in session
      req.session.lti = {
        email: ltiProvider.body.lis_person_contact_email_primary,
        username: ltiProvider.username,
        id: ltiProvider.userId
      }

      res.render(`${componentLocation}/form`, {email: req.session.lti.email});
    }
    else {
      throw err;
    }
  });
});

// LTI submit
router.post('/submit', (req, res, _) => {
  const email = getEmail(req);
  mongoConnectionPool.db.collection(mongoDbName)
    .insertOne({text: req.body.text, email: email})
    .then(result => res.redirect(`/${componentLocation}`));
});

// get email or throw error
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
