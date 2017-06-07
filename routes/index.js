const express = require('express');
const edxCourseApi = require('../lib/edxCourseApi');
const { deliverableContentTree } = require('../lib/contentProvider');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { deliverableContentTree });
});

router.get('/blocks', (req, res) => {
  edxCourseApi.getDisabledBlocks(req.session.user, req.session.token.access_token)
  .then(results => res.send(results));
});

module.exports = router;
