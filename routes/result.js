'use strict';
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  var sessionData = req.session;
  console.info(sessionData.tweet);
  res.render('form', {tweet: sessionData.tweet});
});

router.post('/', function(req, res, next) {
  var data = JSON.stringify(req.body);
  timeData = calc.rapCalcutator(data);
  var sessionData = req.session;
  sessionData.tweet = mktweet.makeTweet(timeData)
  console.info(sessionData.tweet);
  console.log('normal ended');
  res.redirect('/result');
});


module.exports = router;