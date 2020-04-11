'use strict';
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  var sessionData = req.session;
  res.render('afterAdd',{
    nameOfMeet: sessionData.nameOfMeet,
    date: sessionData.date,
    nameOfSwimmer: sessionData.nameOfSwimmer,
    length: sessionData.length,
    style: sessionData.style,
    tweet: sessionData.tweet
  });
});

module.exports = router;