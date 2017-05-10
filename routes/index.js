const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Portfolio' });
});

router.get('/businessPlan', (req, res) => {
  res.render('lti/deliverables/businessPlan', { sveIkad: [ { form: {action: 'sranje',placeholder: {data: 'Jel ovo radi?'}}, type: 'primjer' } ] });
});

module.exports = router;
