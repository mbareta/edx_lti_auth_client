const express = require('express');
const { renderDeliverablesForUser } = require('../../middlewares/lti');

const router = express.Router();

router.get('/', renderDeliverablesForUser);

module.exports = router;
