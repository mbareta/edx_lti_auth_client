// @flow

const {whitelistRoutes} = require('../config/main');

/* req.path is undefined if request does not originate from express app,
therefore external source route is never matched against given array */
const excludesRequestRoute = (routes: Array<string>) =>
  (req: express$Request): boolean => {
    const matchesRoute = routes.some(route => req.path && req.path === route);
    const matchesUpdatePath = req.path.indexOf('/lti/form/update') >= 0;

    return !(matchesRoute || matchesUpdatePath)
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
  }

  return oauthEmail || ltiEmail || ltiRequestEmail || undefined;
}

module.exports = { excludesRequestRoute, skipWhitelistedRoutes, intercept, getEmailFromSession }
