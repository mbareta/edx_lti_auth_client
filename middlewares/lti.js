const Promise = require('bluebird');
const ltiProvider = require('../lib/ltiProvider');
const form = require('../models/lti/form');
const outcomeServiceFactory = require('../lib/outcomeService');
const { ltiTypes } = require('../models/lti/types');

const componentLocation = 'lti/form';

const validateLtiRequest = (req, res, next) => {
  ltiProvider.valid_requestAsync(req)
  .then(isValid => {
    if (isValid) {
      // store user data in session
      req.session.lti = getUserDataFromLti(ltiProvider);
      req.session.outcomeServiceUrl = ltiProvider.outcome_service && ltiProvider.outcome_service.service_url;
      req.session.outcomeServiceSourcedId = ltiProvider.outcome_service && ltiProvider.outcome_service.source_did;
      next();
    }
  })
};

const renderResponsesForUser = (req, res) => {
  const email = getEmail(req);

  form.getResponsesByEmail(email)
  .then(results => res.render(`${componentLocation}/index`, { email, results }))
};

const renderDeliverableForUser = (req, res) => {
  const email = getEmail(req);

  form.getDeliverableByType(email, ltiTypes.SUBDELIVERABLE)
  .then(results => res.render(`${componentLocation}/index`, { email, results }));
};

const addResponse = (req, res) => {
  const email = getEmail(req);
  const formResponse = {
    email,
    type: ltiTypes.SUBDELIVERABLE,
    data: req.body.text,
    metadata: null,
    lti: null
  };

  form.saveResponse(formResponse)
  .then(() => res.redirect(`/${componentLocation}`));
};

const updateResponse = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  form.getResponseById(id)
  .then(formResponse => {
    formResponse.data = text;

    return form.updateResponse(formResponse)
  })
  .then(() => res.redirect(`/${componentLocation}`));
};

const gradeResponse = (req, res) => {
  const responseId = req.params.id;
  const grade = parseFloat(req.body.grade);
  const { token, outcomeServiceUrl, outcomeServiceSourcedId } = req.session;
  const outcomeService = outcomeServiceFactory(outcomeServiceUrl, outcomeServiceSourcedId);

  Promise.all([
    outcomeService.send_replace_resultAsync(grade),
    form.getResponseById(responseId)
  ])
  .then(([isSuccess, formResponse]) => {
    if(isSuccess) {
      formResponse.lti = { outcomeServiceUrl, outcomeServiceSourcedId }
      formResponse.metadata = { grade }

      return formResponse
    }
    else {
      throw new Error('Grading failed!');
    }
  })
  .then(formResponse => form.updateResponse(formResponse))
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
  addResponse,
  gradeResponse
}
