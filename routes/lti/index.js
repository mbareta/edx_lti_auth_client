const express = require('express');
const { renderDeliverablesForUser } = require('../../middlewares/lti');

const router = express.Router();

router.get('/', renderDeliverablesForUser);
router.get('/deliverables', renderDeliverablesForUser);

module.exports = router;
