const express = require('express');
const {
  renderLtiDashboard,
  renderUserDeliverable,
  renderUserDeliverables
} = require('../../middlewares/lti');

const router = express.Router();

router.get('/', renderLtiDashboard);
router.get('/deliverables', renderUserDeliverables);

router.get('/deliverable/:type', renderUserDeliverable);

module.exports = router;
