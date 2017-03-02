const ltiProvider = require('../lib/ltiProvider');

module.exports.validateLtiRequest = (req, res, next) => {
  ltiProvider.valid_requestAsync(req)
    .then(isValid => {
      if(isValid) {
        // store user data in session
        req.session.lti = getUserDataFromLti(ltiProvider);
        next();
      }
    })
    .catch(err => {
      throw err;
    });
}

function getUserDataFromLti(ltiProvider) {
  if(ltiProvider.userId === 'student') {
    return {
      email: 'studio@user',
      username: 'studioUser',
      id: 'studioUserId'
    }
  }
  else {
    return {
      email: ltiProvider.body.lis_person_contact_email_primary,
      username: ltiProvider.username,
      id: ltiProvider.userId}
  }
}
