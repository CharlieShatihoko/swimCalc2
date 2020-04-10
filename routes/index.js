'use strict';
var express = require('express');
var router = express.Router();
var calc = require('./calc');
var mktweet = require('./mktweet');

//ここからrouter
var timeData = {
  timeMin: [],
  timeSec: [],
  timeDeg: [],
  rapSec: [],
  rapDeg: [],
  secTime: []
};

//tweetをセッションで管理に変更
//var tweet = 'none';



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('form', {tweet: '0'});
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