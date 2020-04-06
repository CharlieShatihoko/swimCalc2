'use strict';
var express = require('express');
var router = express.Router();
var calc = require('./calc');
var mktweet = require('./mktweet');
//var globaldata = require('./globaldata');

//OAuth用の呼び出し
var session = require('express-session');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter');


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

//tweetをクリックしたら
router.get('/tweet', passport.authenticate('twitter', {failureRedirect: '/' }), function(req, res){
  profile.post('statuses/update', tweet, function(error,tweets,respons){
    if(error){
      console.error('tweet failed');
    }
  });
});

module.exports = router;