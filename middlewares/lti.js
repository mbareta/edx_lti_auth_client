const ltiProvider = require('../lib/ltiProvider');
const form = require('../models/lti/form');
const { ltiTypes } = require('../models/lti/types');

const componentLocation = 'lti/form';

const validateLtiRequest = (req, res, next) => {
  ltiProvider.valid_requestAsync(req)
    .then(isValid => {
      if (isValid) {
        // store user data in session
        req.session.lti = getUserDataFromLti(ltiProvider);
        next();
      }
    })
    .catch(err => { throw err; });
};

const renderResponsesForUser = (req, res) => {
  const email = getEmail(req);

  form.getResponsesByEmail(email)
    .then(results => res.render(`${componentLocation}/index`, { email, results }))
    .catch(error => { throw error; });
};

const renderDeliverableForUser = (req, res) => {
  const email = getEmail(req);

  form.getDeliverableByType(email, ltiTypes.SUBDELIVERABLE)
   .then(results => res.render(`${componentLocation}/index`, { email, results }));
};

const updateResponse = (req, res) => {
  form.updateResponse(req.params.id, req.body.text, null)
    .then(() => res.redirect(`/${componentLocation}`));
};

const addResponse = (req, res) => {
  const email = getEmail(req);
  form.saveResponse(email, ltiTypes.SUBDELIVERABLE, req.body.text, null)
    .then(() => res.redirect(`/${componentLocation}`));
};

function getUserDataFromLti(ltiProvider) {
  let userData;
  if (ltiProvider.userId === 'student') {
    userData = {
      email: 'studio@user',
      username: 'studioUser',
      id: 'studioUserId'
    };
  }
  else {
    userData = {
      email: ltiProvider.body.lis_person_contact_email_primary,
      username: ltiProvider.username,
      id: ltiProvider.userId
    };
  }

  return userData;
}

// get email or throw error
function getEmail(req) {
  const email = req.email;
  if (email) {
    return email;
  }
  else {
    throw new Error('Not Authorized');
  }
}

module.exports = {
  validateLtiRequest,
  renderResponsesForUser,
  renderDeliverableForUser,
  updateResponse,
  addResponse
}
