const express = require('express');
const {
  renderUserResponses,
  addResponse,
  updateResponse,
  gradeResponse
} = require('../../middlewares/lti');

const router = express.Router();

// view results
router.get('/', renderUserResponses);

// LTI update
router.post('/update/:id', updateResponse);

router.post('/grade/:id', gradeResponse);

// LTI submit
router.post('/submit/:type/:name', addResponse);

module.exports = router;
