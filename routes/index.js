const express = require('express');
const EdxCourseApi = require('../lib/edxCourseApi');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Portfolio' });
});

router.get('/blocks', (req, res) => {
  EdxCourseApi.getDisabledBlocks(req.session.user, req.session.token.access_token)
  .then(results => res.send(results))
});

module.exports = router;
