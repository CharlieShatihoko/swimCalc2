'use strict';
var express = require('express');
var router = express.Router();
var insert = require('./insert');


router.get('/', function(req, res, next) {
  var sessionData = req.session;

  //データーベースに登録
  insert.insertToDatabase(sessionData);

  //登録完了を知らせる
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