const Promise = require('bluebird');
const ltiProvider = require('../lib/ltiProvider');
const responsesRepository = require('../models/lti/responsesRepository');
const outcomeServiceFactory = require('../lib/outcomeService');
const { ltiTypes } = require('../models/lti/types');

const componentLocation = 'lti';

const validateLtiRequest = (req, res, next) => {
  ltiProvider.valid_requestAsync(req)
  .then(isValid => {
    if (isValid) {
      // store user data in session
      req.session.lti = getUserDataFromLtiAndReq(ltiProvider, req);
      next();
    }
  });
};

const renderUserResponses = (req, res) => {
  const email = getEmail(req);

  responsesRepository.getResponsesByEmail(email)
  .then(results => res.render(`${componentLocation}/index`, { email, results }));
};

const renderUserDeliverablesCurried = (view = 'lti/deliverables') => (req, res) => {
  const email = getEmail(req);

  responsesRepository.getDeliverableTypesByEmail(email)
  .then(results => res.render(view, { email, results }));
};
const renderUserDeliverables = renderUserDeliverablesCurried();
const renderLtiDashboard = renderUserDeliverablesCurried('lti/index');

const renderUserDeliverable = (req, res) => {
  const { type } = req.params;
  const email = getEmail(req);

  responsesRepository.getDeliverableByType(email, type)
  .then(results => res.render(`${componentLocation}/deliverables/${type}`, { email, results }));
};

const addResponse = (req, res) => {
  const { name, type } = req.params;
  const email = getEmail(req);

  const formResponse = {
    name,
    email,
    type,
    data: req.body.text,
    metadata: null,
    lti: req.session.lti || {}
  };

  responsesRepository.upsert(formResponse)
  .then(() => res.redirect(`/${componentLocation}`));
};

const updateResponse = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  responsesRepository.getResponseById(id)
  .then(formResponse => {
    formResponse.data = text;

    return responsesRepository.upsert(formResponse);
  })
  .then(() => res.redirect(`/${componentLocation}`));
};

const gradeResponse = (req, res) => {
  const responseId = req.params.id;
  const grade = parseFloat(req.body.grade);
  const { outcomeServiceUrl, outcomeServiceSourcedId } = req.session.lti;
  const outcomeService = outcomeServiceFactory(outcomeServiceUrl, outcomeServiceSourcedId);

  Promise.all([
    outcomeService.send_replace_resultAsync(grade),
    responsesRepository.getResponseById(responseId)
  ])
  .then(([isSuccess, formResponse]) => {
    if (isSuccess) {
      formResponse.lti = { outcomeServiceUrl, outcomeServiceSourcedId };
      formResponse.metadata = { grade, gradedAt: Date.now() };

      return formResponse;
    }
    throw new Error('Grading failed!');
  })
  .then(formResponse => responsesRepository.updateResponse(formResponse))
  .then(() => res.redirect(`/${componentLocation}`));
};

function getUserDataFromLtiAndReq(ltiProvider, req) {
  const { userId, body, username, outcome_service: { service_url, source_did } } = ltiProvider;
  const { body: { context_id, lis_person_contact_email_primary }  } = req;

  if (userId === 'student') {
    return {
      email: 'studio@user',
      username: 'studioUser',
      id: 'studioUserId',
      courseId: 'context_id',
      outcomeServiceUrl: 'service_url',
      outcomeServiceSourcedId: 'source_did'
    };
  }
  return {
    email: lis_person_contact_email_primary,
    username,
    id: userId,
    courseId: context_id,
    outcomeServiceUrl: service_url,
    outcomeServiceSourcedId: source_did
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
