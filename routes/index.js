const express = require('express');
const edxCourseApi = require('../lib/edxCourseApi');
const { deliverableContentTree } = require('../lib/contentProvider');
const { getEmailFromRequest } = require('../lib/helpers');
const responsesRepository = require('../models/lti/responsesRepository');
const {
  getDeliverable
} = require('../lib/contentProvider');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  const email = getEmailFromRequest(req);

  responsesRepository.getResponsesByEmail(email)
    .then(responses => {
      const activitiesResults = Object.keys(deliverableContentTree)
        .map(deliverable => ({
          deliverable,
          solvedActivities: responses.filter(response => response.type === deliverable).length,
          totalActivities: getDeliverable(deliverable).activitiesCount
        }));

      res.render('index', { email, deliverableContentTree, activitiesResults });
    });
});

router.get('/blocks', (req, res) => {
  edxCourseApi.getDisabledBlocks(req.session)
  .then(results => res.send(results));
});

module.exports = router;
