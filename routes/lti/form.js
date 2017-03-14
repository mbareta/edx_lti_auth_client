// const Promise = require('bluebird');
const express = require('express');
const router = express.Router();
const mongoConnectionPool = require('../../lib/mongoConnectionPool');

const {
  validateLtiRequest,
  renderResponsesForUser,
  renderDeliverableForUser,
  addResponse,
  updateResponse
} = require('../../middlewares/lti');

const mongoDbName = 'form_responses';
const componentLocation = 'lti/form';

// view results
router.get('/', renderResponsesForUser);

router.get('/deliverable', renderDeliverableForUser);

// LTI view
router.post('/', validateLtiRequest, (req, res) => {
  res.render(`${componentLocation}/createResponse`,
    {
      email: req.session.lti.email,
      form: {
        action: '/lti/form/submit',
        placeholder: 'Say something...'
      }
    });
});

// LTI update
router.post('/update/:id', updateResponse);

// LTI submit
router.post('/submit', addResponse);

module.exports = router;
