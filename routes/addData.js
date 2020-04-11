'use strict';
var express = require('express');
var router = express.Router();



// GETされたらaddDataを返す
router.get('/', function(req, res, next) {
  res.render('addData');
});

//POSTされたらデータを受け取り、sessionに保存し/addData/dataConfirmにリダイレクト
router.post('/', function(req, res, next) {
  //受け取るsessionオブジェクトの定義
  var sessionData = req.session;
  //受け取り、格納する
  sessionData.nameOfMeet = req.body.nameOfMeet;
  sessionData.date = req.body.date;
  sessionData.nameOfSwimmer = req.body.nameOfSwimmer;
  sessionData.length = req.body.length;
  sessionData.style = req.body.style;

  //リダイレクト処理
  res.redirect('/addData/dataConfirm');
});


//確認画面用のurl
//getされたら確認画面を表示
router.get('/dataConfirm', function(req, res, next){
  var sessionData = req.session;
  res.render('confirm',{
    //変数渡し
    nameOfMeet: sessionData.nameOfMeet,
    date: sessionData.date,
    nameOfSwimmer: sessionData.nameOfSwimmer,
    length: sessionData.length,
    style: sessionData.style,
    tweet: sessionData.tweet
  });
});
module.exports = router;