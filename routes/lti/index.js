const express = require('express');
const {
  renderUserDeliverable,
  renderUserDeliverables,
  validateLtiRequest,
  serveDeliverableAsRtf,
  serveDeliverableAsWord
} = require('../../middlewares/lti');

const router = express.Router();

router.get('/deliverables', renderUserDeliverables);

router.route('/deliverables/:type')
  .get(renderUserDeliverable)
  .post(validateLtiRequest, renderUserDeliverable);

router.get('/deliverables/:type/download', serveDeliverableAsRtf);

router.get('/deliverables/:type/downloadWord', serveDeliverableAsWord);

module.exports = router;
