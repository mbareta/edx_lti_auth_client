/* eslint-disable */
const Promise = require('bluebird');
const ltiProvider = require('../lib/ltiProvider');
const responsesRepository = require('../models/lti/responsesRepository');
const outcomeServiceFactory = require('../lib/outcomeService');
const { getDeliverable, getSubDeliverable, getActivity, getPathToActivity, deliverableContentTree } = require('../lib/contentProvider');

const componentLocation = 'lti';

const validateLtiRequest = (req, res, next) => {
  ltiProvider.valid_requestAsync(req).then(isValid => {
    if (isValid) {
      // store user data in session
      req.session.lti = getUserDataFromLtiAndReq(ltiProvider, req);
      next();
    } else {
      throw new Error('Invalid LTI request.')
    }
  });
};

const renderUserResponses = (req, res) => {
  const email = getEmail(req);

  responsesRepository
    .getResponsesByEmail(email)
    .then(results =>
      res.render(`${componentLocation}/form/index`, { email, results })
    );
};

const renderUserResponse = (req, res, next) => {
  const email = getEmail(req);
  const name = req.params.name;
  const { blocks } = req.session;

  responsesRepository
    .getResponseByEmail(name, email)
    .then(response =>
      res.render(`${componentLocation}/activity`, {
        activity: response,
        createLink: `/lti/form/submit/${response.type}/${response.subType}/${response.name}`,
        getActivity,
        blocks
      })
    );
};

const renderUserDeliverablesCurried = (view = 'lti/deliverables') => (
  req,
  res
) => {
  const email = getEmail(req);
  res.render(view, { email, deliverableContentTree });
};
const renderUserDeliverables = renderUserDeliverablesCurried();

const renderUserDeliverable = (req, res) => {
  const { type } = req.params;
  const email = getEmail(req);
  const { blocks } = req.session;

  responsesRepository.getDeliverableByType(email, type).then(results => {
    const activitiesTotalCount = deliverableContentTree[type].activitiesCount;
    const solvedActivitiesCount = results.filter(result => !!result.data)
      .length;

    res.render(`${componentLocation}/deliverables/${type}`, {
      email,
      results,
      type,
      solvedActivitiesCount,
      activitiesTotalCount,
      getDeliverable,
      getSubDeliverable,
      getActivity,
      deliverableContentTree,
      blocks
    });
  });
};

const addResponse = (req, res) => {
  const { name, type, subType } = req.params;
  const email = getEmail(req);

  const formResponse = {
    name,
    email,
    type,
    data: req.body.data,
    subType,
    metadata: null,
    lti: req.session.lti || {}
  };

  responsesRepository
    .upsert(formResponse)
    .then(() => res.sendStatus(200));
};

const saveResponseOnFirstVisit = (req, res, next) => {
  const { name } = req.params;
  const email = getEmail(req);

  responsesRepository.getResponseByEmail(name, email)
  .then(response => {
    if (!response) {
      const { deliverable, subDeliverable } = getPathToActivity(name);
      const formResponse = {
        name,
        email,
        type: deliverable,
        subType: subDeliverable,
        data: null,
        metadata: null,
        lti: req.session.lti || {}
      };

      responsesRepository
        .upsert(formResponse)
        .then(() => next());
    } else {
      next();
    }
  })
};

const updateResponse = (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  responsesRepository
    .getResponseById(id)
    .then(formResponse => {
      formResponse.data = data;

      return responsesRepository.upsert(formResponse);
    })
    .then(() => res.sendStatus(200));
};

const gradeResponse = (req, res) => {
  const responseId = req.params.id;
  const grade = parseFloat(req.body.grade);
  const { outcomeServiceUrl, outcomeServiceSourcedId } = req.session.lti;
  const outcomeService = outcomeServiceFactory(
    outcomeServiceUrl,
    outcomeServiceSourcedId
  );

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
  const {
    userId,
    username,
    outcome_service: { service_url, source_did }
  } = ltiProvider;
  const {
    body: { context_id, lis_person_contact_email_primary },
    params: { name }
  } = req;

  if (userId === 'student') {
    return {
      email: 'studio@user',
      username: 'studioUser',
      id: 'studioUserId',
      courseId: 'context_id',
      outcomeServiceUrl: 'service_url',
      outcomeServiceSourcedId: name
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
  renderUserResponse,
  renderUserDeliverables,
  renderUserDeliverable,
  updateResponse,
  addResponse,
  gradeResponse,
  saveResponseOnFirstVisit
};
