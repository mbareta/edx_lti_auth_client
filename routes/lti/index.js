const express = require('express');
const {
  renderUserDeliverable,
  renderUserDeliverables,
  validateLtiRequest,
  serveDeliverableAsRtf
} = require('../../middlewares/lti');

const router = express.Router();

router.get('/deliverables', renderUserDeliverables);

router.get('/deliverables/:type', renderUserDeliverable);

router.post('/deliverables/:type', validateLtiRequest, renderUserDeliverable);

router.get('/deliverables/:type/download', serveDeliverableAsRtf);

module.exports = router;
