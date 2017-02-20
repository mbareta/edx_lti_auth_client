const express = require('express');
const router = express.Router();
const mongoConnectionPool = require('../../lib/mongoConnectionPool');

router.get('/', (req, res, next) => {
  mongoConnectionPool.db.collection('responses').find().toArray()
    .then(results => res.render('lti/index', {results: results}));
});

router.post('/', (req, res, next) => {
  const collection = mongoConnectionPool.db.collection('responses');
  collection.insertOne({text: req.body.text})
    .then(result => res.redirect('/lti'));
});

module.exports = router;
