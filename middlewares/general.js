const { getEmailFromSession } = require('../lib/helpers');

module.exports.storeRequestOriginUrl = (req, res, next) => {
  req.session.redirectToUrl = req.originalUrl;
  next();
};

module.exports.redirectAnonymous = (req, res, next) => {
  if (getEmailFromSession(req)) {
    next();
  } else {
    res.redirect('/users/auth');
  }
};
