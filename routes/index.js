'use strict';
var express = require('express');
var router = express.Router();
var calc = require('./calc');
var mktweet = require('./mktweet');

//OAuth.ioの呼び出し
var OAuth = require('oauthio'); 

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

router.get('/tweet', function (req, res, tweet){
  console.info(tweet);
  //var data = JSON.parse(tweet);
  //data contains field "message", containing the message to post
  
  OAuth.auth('twitter', req.session)
      .then(function (request_object) {
          return request_object.post('status/update', {
              status: tweet
          });
      })
      .then(function (r) {
          //r contains Facebook's response, normaly an id
          if (r.id)
              res.send(200, 'Successfully posted message');
          else
              res.send(400, 'An error occured while posting the message');
      })
      .fail(function (e) {
          res.send(400, 'An error occured while posting the message');
      });
});


module.exports = router;