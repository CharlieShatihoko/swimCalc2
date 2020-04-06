'use strict';
var express = require('express');
var router = express.Router();
var calc = require('./calc');
var mktweet = require('./mktweet');
//var globaldata = require('./globaldata');

var timeData = {
  timeMin: [],
  timeSec: [],
  timeDeg: [],
  rapSec: [],
  rapDeg: [],
  secTime: []
};

var tweet = 'none';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('form', {tweet: tweet});
});

router.post('/', function(req, res, next) {
  var data = JSON.stringify(req.body);
  timeData = calc.rapCalcutator(data);
  tweet = mktweet.makeTweet(timeData)
  console.info(tweet);
  console.log('normal ended');
  res.redirect('/');
});

module.exports = router;