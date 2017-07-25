const ltiProvider = require('../lib/ltiProvider');
const responsesRepository = require('../models/lti/responsesRepository');
const outcomeServiceFactory = require('../lib/outcomeService');
const htmlToRtf = require('../lib/exportContent');
const { getEmailFromRequest, getUserDataFromLtiAndReq } = require('../lib/helpers');
const {
  getDeliverable,
  getSubDeliverable,
  getActivity,
  getPathToActivity,
  deliverableContentTree,
  getDeliverableContent
} = require('../lib/contentProvider');

const componentLocation = 'lti';

const validateLtiRequest = (req, res, next) => {
  ltiProvider.valid_requestAsync(req).then(isValid => {
    if (isValid) {
      // store user data in session
      req.session.lti = getUserDataFromLtiAndReq(ltiProvider, req);
      next();
    } else {
      throw new Error('Invalid LTI request.');
    }
  });
};

const renderUserResponses = (req, res) => {
  const email = getEmailFromRequest(req);

  responsesRepository
    .getResponsesByEmail(email)
    .then(results =>
      res.render(`${componentLocation}/form/index`, { email, results })
    );
};

const renderUserResponse = (req, res) => {
  const email = getEmailFromRequest(req);
  const name = req.params.name;
  const { blocks } = req.session;

  responsesRepository.getResponseByEmail(name, email).then(response =>
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
  const email = getEmailFromRequest(req);

  responsesRepository.getResponsesByEmail(email)
    .then(responses => {
      const activitiesResults = Object.keys(deliverableContentTree)
        .map(deliverable => ({
          deliverable,
          solvedActivities: responses.filter(response => response.type === deliverable).length,
          totalActivities: getDeliverable(deliverable).activitiesCount
        }));

      res.render(view, { email, getDeliverable, deliverableContentTree, activitiesResults });
    });
};
const renderUserDeliverables = renderUserDeliverablesCurried();

const renderUserDeliverable = (req, res) => {
  const { type } = req.params;
  const email = getEmailFromRequest(req);
  const { blocks } = req.session;

  responsesRepository.getDeliverableByType(email, type).then(results => {
    const activitiesTotalCount = getDeliverable(type).activitiesCount;
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
  const email = getEmailFromRequest(req);

  const formResponse = {
    name,
    email,
    type,
    data: req.body.data,
    subType,
    metadata: null,
    lti: req.session.lti || {}
  };

  responsesRepository.upsert(formResponse).then(() => res.sendStatus(200));
};

const saveResponseOnFirstVisit = (req, res, next) => {
  const { name } = req.params;
  const email = getEmailFromRequest(req);

  responsesRepository.getResponseByEmail(name, email).then(response => {
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

      responsesRepository.upsert(formResponse).then(next);
    } else {
      next();
    }
  });
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

const serveDeliverableAsRtf = (req, res) => {
  const { type } = req.params;
  const email = getEmailFromRequest(req);

  responsesRepository
    .getDeliverableByType(email, type)
    .then(deliverableData => getDeliverableContent(type, deliverableData))
    .then(content => {
      res.setHeader('Content-Type', 'application/rtf');
      res.setHeader('Content-Disposition', `attachment; filename=${type}.rtf`);
      res.send(htmlToRtf(content));
    });
};

module.exports = {
  renderUserDeliverablesCurried,
  validateLtiRequest,
  renderUserResponses,
  renderUserResponse,
  renderUserDeliverables,
  renderUserDeliverable,
  updateResponse,
  addResponse,
  gradeResponse,
  saveResponseOnFirstVisit,
  serveDeliverableAsRtf
};
