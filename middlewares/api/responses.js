const responsesRepository = require('../../models/lti/responsesRepository');

const updateResponsesEmail = ({ headers, body }, res) => {
  if (headers.authorization !== process.env.WORKSPACE_API_KEY) {
    return res.status(403).send('Invalid API key.');
  }
  const { oldEmail, newEmail } = body;

  if (!oldEmail || !newEmail) {
    return res.status(400).send('Missing email parameter.');
  }

  return responsesRepository.existsByEmail(newEmail).then(existsWithNewEmail => {
    if (existsWithNewEmail) {
      return res.status(409).send('User with the new email already has responses.');
    }

    return responsesRepository.updateResponsesEmail(oldEmail, newEmail).then(({ result }) => {
      if (result.n < 1) {
        return res.sendStatus(404).send("User with matching email doesn't exist");
      }

      return res.sendStatus(200);
    });
  });
};

module.exports = { updateResponsesEmail };
