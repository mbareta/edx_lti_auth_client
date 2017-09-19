const express = require('express');
const {
  renderUserResponses,
  renderUserResponse,
  addResponse,
  updateResponse,
  gradeResponse,
  saveResponseOnFirstVisit,
  updateResponsesEmail,
  validateLtiRequest
} = require('../../middlewares/lti');

const router = express.Router();

// view results
router.get('/', renderUserResponses);

// view individual
router.post('/:name', validateLtiRequest, saveResponseOnFirstVisit, renderUserResponse);

// LTI update
router.post('/update/:id', updateResponse);

router.post('/grade/:id', gradeResponse);

// LTI submit
router.post('/submit/:type/:subType/:name', addResponse);

module.exports = router;
