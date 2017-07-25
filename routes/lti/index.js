const express = require('express');
const {
  renderUserDeliverable,
  renderUserDeliverables,
  validateLtiRequest,
  serveDeliverableAsRtf
} = require('../../middlewares/lti');

const router = express.Router();

router.get('/deliverables', renderUserDeliverables);

router.route('/deliverables/:type')
  .get(renderUserDeliverable)
  .post(validateLtiRequest, renderUserDeliverable);

router.get('/deliverables/:type/download', serveDeliverableAsRtf);

module.exports = router;
