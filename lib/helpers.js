// @flow

const {whitelistRoutes} = require('../config');

/* req.path is undefined if request does not originate from express app,
therefore external source route is never matched against given array */
const excludesRequestRoute = (routes: Array<string>) =>
  (req: express$Request): boolean => {
    const matchesRoute = routes.some(route => req.path && req.path === route);
    const matchesUpdatePath = req.path.indexOf('/lti/form/update') >= 0;
    const matchesApiPath = req.path.indexOf('/api') >= 0;

    return !(matchesRoute || matchesUpdatePath || matchesApiPath)
  }

const intercept = (predicate: predicate, middleware: express$Middleware) =>
  (req: express$Request, res: express$Response, next: express$NextFunction) => predicate(req) ?
    middleware(req, res, next)
    :
    next()

const isNotWhitelisted = excludesRequestRoute(whitelistRoutes)
const skipWhitelistedRoutes = (middleware: express$Middleware) => intercept(isNotWhitelisted, middleware)

const getEmailFromSession = (req: express$Request) => {
  const oauthEmail = req.session.user && req.session.user.email;
  const ltiEmail = req.session.lti && req.session.lti.email;
  let ltiRequestEmail;
  if(req.body && req.body.lti_version) {
    if (req.body.user_id === 'student') {
      ltiRequestEmail = 'studio@user'
    }
    else {
      ltiRequestEmail = req.body.lis_person_contact_email_primary
    }

    return ltiEmail || ltiRequestEmail || undefined;
  }

  return oauthEmail || undefined;
}

// get email or throw error
function getEmailFromRequest(req: express$Request) {
  const email = req.email;
  if (email) {
    return email;
  }
  throw new Error('Not Authorized');
}

function getUserDataFromLtiAndReq(ltiProvider, req) {
  const {
    body: { context_id, lis_person_contact_email_primary }
  } = req;

  const {
    userId,
    username,
    outcome_service: { service_url, source_did }
  } = ltiProvider;

  if (userId === 'student') {
    return getMockedStudioUser(req.params.name);
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

function getMockedStudioUser(activityName) {
  return {
    email: 'studio@user',
    username: 'studioUser',
    id: 'studioUserId',
    courseId: 'context_id',
    outcomeServiceUrl: 'service_url',
    outcomeServiceSourcedId: activityName
  };
}

module.exports = { excludesRequestRoute, skipWhitelistedRoutes, intercept, getEmailFromSession, getEmailFromRequest, getUserDataFromLtiAndReq }
