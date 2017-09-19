const express = require('express');
const { updateResponsesEmail } = require('../../middlewares/api/responses');

const router = express.Router();

router.post('/change_email', updateResponsesEmail);

module.exports = router;
