const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(req.session.user);
  res.render('index', { title: 'Portfolio', email: req.session.user.email });
});

module.exports = router;
