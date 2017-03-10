// @flow

const {whitelistRoutes} = require('../config/main');

/* req.path is undefined if request does not originate from express app,
therefore external source route is never matched against given array */
const excludesRequestRoute = (routes: Array<string>) =>
  (req: express$Request): boolean => !routes.some(route => req.path && req.path === route)

const intercept = (predicate: predicate, middleware: express$Middleware) =>
  (req: express$Request, res: express$Response, next: express$NextFunction) => predicate(req) ?
    middleware(req, res, next)
    :
    next()

const isNotWhitelisted = excludesRequestRoute(whitelistRoutes)
const skipWhitelistedRoutes = (middleware: Function) => intercept(isNotWhitelisted, middleware)

const getEmailFromSession = (req: express$Request) => {
  const oauthEmail = req.session.user && req.session.user.email;
  const ltiEmail = req.session.lti && req.session.lti.email;

  return oauthEmail || ltiEmail || undefined;
}

module.exports = { excludesRequestRoute, skipWhitelistedRoutes, intercept, getEmailFromSession }
