const express = require('express');
const edxCourseApi = require('../lib/edxCourseApi');
const { renderUserDeliverablesCurried } = require('../middlewares/lti');

const router = express.Router();

/* GET home page. */
router.get('/', renderUserDeliverablesCurried('index'));

router.get('/blocks', (req, res) => {
  edxCourseApi.getDisabledBlocks(req.session)
  .then(results => res.send(results));
});

module.exports = router;
