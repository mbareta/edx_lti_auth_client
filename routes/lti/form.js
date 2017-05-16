const express = require('express');
const {
  validateLtiRequest,
  renderUserResponses,
  addResponse,
  updateResponse,
  gradeResponse
} = require('../../middlewares/lti');

const router = express.Router();
const componentLocation = 'lti/form';

// view results
router.get('/', renderUserResponses);

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

router.post('/grade/:id', gradeResponse);

// LTI submit
router.post('/submit/:type/:name', addResponse);

module.exports = router;
