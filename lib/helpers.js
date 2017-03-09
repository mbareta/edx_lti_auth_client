// @flow

function skipRoutes(routes: Array<string>, middleware: Function) {
  return (req, res, next) => {
    if(routes.some(route => route === req.path)) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
}

function getEmailFromSession(req) {
  const oauthEmail = req.session.user && req.session.user.email;
  const ltiEmail = req.session.lti && req.session.lti.email;

  return oauthEmail || ltiEmail || undefined;
}

module.exports = { skipRoutes, getEmailFromSession }
