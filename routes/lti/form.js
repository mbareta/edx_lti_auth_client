const express = require('express');
const router = express.Router();
const mongoConnectionPool = require('../../lib/mongoConnectionPool');
const ltiProvider = require('../../lib/ltiProvider');
const form = require('../../models/lti/form');
const {ltiTypes} = require('../../models/lti/types');

const mongoDbName = 'form_responses';
const componentLocation = 'lti/form';

// view results
router.get('/', (req, res, _) => {
  const email = getEmail(req);

  form.getResponsesByEmail(email)
    .then(results => res.render(`${componentLocation}/index`, {email, results}));
});

router.get('/deliverable', (req, res, next) => {
  const email = getEmail(req);

  form.getDeliverableByType(email, ltiTypes.SUBDELIVERABLE)
   .then(results => res.render(`${componentLocation}/index`, {email, results}));
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
  form.saveResponse(email, ltiTypes.SUBDELIVERABLE, req.body.text, null)
    .then(result => res.redirect(`/${componentLocation}`));
});

// get email or throw error
function getEmail(req) {
  const email = req.email;
  if(email) {
    return email
  }
  else {
    throw new Error('Not Authorized')
  }
}

module.exports = router;
