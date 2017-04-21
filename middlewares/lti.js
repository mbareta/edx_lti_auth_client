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
      const { outcome_service: { service_url, source_did } } = ltiProvider;
      // store user data in session
      req.session.lti = getUserDataFromLti(ltiProvider);
      req.session.outcomeServiceUrl = service_url; // eslint-disable-line
      req.session.outcomeServiceSourcedId = source_did; // eslint-disable-line
      next();
    }
  });
};

const renderUserResponses = (req, res) => {
  const email = getEmail(req);

  form.getResponsesByEmail(email)
  .then(results => res.render(`${componentLocation}/index`, { email, results }));
};

const renderUserDeliverablesCurried = (view = 'lti/deliverables') => (req, res) => {
  const email = getEmail(req);

  form.getDeliverableTypesByEmail(email)
  .then(results => res.render(view, { email, results }));
};
const renderUserDeliverables = renderUserDeliverablesCurried();
const renderLtiDashboard = renderUserDeliverablesCurried('lti/index');

const renderUserDeliverable = (req, res) => {
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

  form.upsert(formResponse)
  .then(() => res.redirect(`/${componentLocation}`));
};

const updateResponse = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  form.getResponseById(id)
  .then(formResponse => {
    formResponse.data = text;

    return form.upsert(formResponse);
  })
  .then(() => res.redirect(`/${componentLocation}`));
};

const gradeResponse = (req, res) => {
  const responseId = req.params.id;
  const grade = parseFloat(req.body.grade);
  const { outcomeServiceUrl, outcomeServiceSourcedId } = req.session;
  const outcomeService = outcomeServiceFactory(outcomeServiceUrl, outcomeServiceSourcedId);

  Promise.all([
    outcomeService.send_replace_resultAsync(grade),
    form.getResponseById(responseId)
  ])
  .then(([isSuccess, formResponse]) => {
    if (isSuccess) {
      formResponse.lti = { outcomeServiceUrl, outcomeServiceSourcedId };
      formResponse.metadata = { grade, gradedAt: Date.now() };

      return formResponse;
    }
    else {
      throw new Error('Grading failed!');
    }
  })
  .then(formResponse => form.updateResponse(formResponse))
  .then(() => res.redirect(`/${componentLocation}`));
};

function getUserDataFromLti(ltiProvider) {
  const { userId, body, username } = ltiProvider;

  if (userId === 'student') {
    return {
      email: 'studio@user',
      username: 'studioUser',
      id: 'studioUserId'
    };
  }
  return {
    email: body.lis_person_contact_email_primary,
    username,
    id: userId
  };
}

// get email or throw error
function getEmail(req) {
  const email = req.email;
  if (email) {
    return email;
  }
  throw new Error('Not Authorized');
}

module.exports = {
  validateLtiRequest,
  renderUserResponses,
  renderLtiDashboard,
  renderUserDeliverables,
  renderUserDeliverable,
  updateResponse,
  addResponse,
  gradeResponse
};
