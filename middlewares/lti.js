const ltiProvider = require('../lib/ltiProvider');
const form = require('../models/lti/form');
const {ltiTypes} = require('../models/lti/types');
const componentLocation = 'lti/form';

module.exports.validateLtiRequest = (req, res, next) => {
  ltiProvider.valid_requestAsync(req)
    .then(isValid => {
      if(isValid) {
        // store user data in session
        req.session.lti = getUserDataFromLti(ltiProvider);
        next();
      }
    })
    .catch(err => { throw err; });
}

module.exports.renderResponsesForUser = (req, res) => {
  const email = getEmail(req);

  form.getResponsesByEmail(email)
    .then(results => res.render(`${componentLocation}/index`, {email, results}))
    .catch(error => { throw error });
}

module.exports.renderDeliverableForUser = (req, res) => {
  const email = getEmail(req);

  form.getDeliverableByType(email, ltiTypes.SUBDELIVERABLE)
   .then(results => res.render(`${componentLocation}/index`, {email, results}))
   .catch(error => { throw error });
}

module.exports.updateResponse = (req, res) => {
  form.updateResponse(req.params.id, req.body.text, null)
    .then(result => res.redirect(`/${componentLocation}`))
    .catch(error => { throw error });
}

module.exports.addResponse = (req, res) => {
  const email = getEmail(req);
  form.saveResponse(email, ltiTypes.SUBDELIVERABLE, req.body.text, null)
    .then(result => res.redirect(`/${componentLocation}`))
    .catch(error => { throw error });
}

function getUserDataFromLti(ltiProvider) {
  if(ltiProvider.userId === 'student') {
    return {
      email: 'studio@user',
      username: 'studioUser',
      id: 'studioUserId'
    }
  }
  else {
    return {
      email: ltiProvider.body.lis_person_contact_email_primary,
      username: ltiProvider.username,
      id: ltiProvider.userId}
  }
}

// get email or throw error
function getEmail(req) {
  const email = req.email;
  if(email) {
    return email;
  }
  else {
    throw new Error('Not Authorized');
  }
}
