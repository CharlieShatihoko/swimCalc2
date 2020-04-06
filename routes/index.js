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
var user = require('../app').user;
var OAuth = require('oauth').OAuth;
var oa;
const consumerKey = process.env.NODE_ENV_ConsumerKey;
const consumerSecret= process.env.NODE_ENV_ConsumerSecret;


// We init OAuth with our consumer key & secret just like with passport
function initTwitterOauth() {
  oa = new OAuth(
    "https://twitter.com/oauth/request_token"
  , "https://twitter.com/oauth/access_token"
  , consumerKey
  , consumerSecret
  , "1.0A"
  , "http://" + domain + ":" + port + "/authn/twitter/callback"
  , "HMAC-SHA1"
  );
}


//ここからrouter
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

router.post('/tweet',  function(req, res){
  oa.post('https://api.twitter.com/1.1/statuses/update.json', user.token, user.tokenSecret, {"status":tweet} ,function(error,tweets,respons){
    if(error){
      console.error('tweet failed');
    }else{
      console.info(tweet);
    }
  res.redirect('/');
  });
});

module.exports = router;