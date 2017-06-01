const express = require('express');
const {
  renderLtiDashboard,
  renderUserDeliverable,
  renderUserDeliverables,
  validateLtiRequest
} = require('../../middlewares/lti');

const router = express.Router();

router.get('/', renderLtiDashboard);
router.get('/deliverables', renderUserDeliverables);

router.get('/deliverable/:type', renderUserDeliverable);
router.post('/deliverable/:type', validateLtiRequest, renderUserDeliverable);

module.exports = router;
