const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('lti/index', {email: req.session.user.email});
});


module.exports = router;
