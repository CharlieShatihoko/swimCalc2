'use strict';
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  var sessionData = req.session;
  res.render('tweet',{tweet: sessionData.tweet});
});

module.exports = router;