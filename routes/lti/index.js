const express = require('express');
const {
  renderLtiDashboard,
  renderUserDeliverables
} = require('../../middlewares/lti');

const router = express.Router();

router.get('/', renderLtiDashboard);
router.get('/deliverables', renderUserDeliverables);

module.exports = router;
