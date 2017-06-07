const express = require('express');
const {
  renderUserDeliverable,
  renderUserDeliverables,
  validateLtiRequest
} = require('../../middlewares/lti');

const router = express.Router();

router.get('/deliverables', renderUserDeliverables);

router.get('/deliverables/:type', renderUserDeliverable);

router.post('/deliverables/:type', validateLtiRequest, renderUserDeliverable);

module.exports = router;
