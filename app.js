var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
//環境変数の呼び出し
require('dotenv').config();
const consumerKey = process.env.NODE_ENV_ConsumerKey;
const consumerSecret= process.env.NODE_ENV_ConsumerSecret;

//OAuth用の呼び出し
//var config = require('./config');
var session = require('express-session');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter');


//route に使う
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();


// セッションへの保存と読み出し ・・・・①
passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((obj, callback) => {
  callback(null, obj);
});

// 認証の設定 ・・・・②
passport.use(new TwitterStrategy({
  consumerKey: consumerKey,
  consumerSecret: consumerSecret,
  //callbackURL: config.get('twitter.callbackUrl')
},
// 認証後のアクション
(accessToken, refreshToken, profile, callback) => {
  process.nextTick(() => {
      console.log(profile); //必要に応じて変更
      return callback(null, profile);
  });
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// セッションの設定　・・・・①
app.use(session({
  secret: 'reply-analyzer',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // ・・・・①

// 指定したpathで認証　・・・・③
app.get('/auth/twitter', passport.authenticate('twitter'));

// callback後の設定　・・・・④
app.get('/auth/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/login' }), (req, res) => {
  res.redirect('/'); //認証後のリダイレクト
});

//app.get('/', function(req, res) {
//  res.render('index', {title : 'タイトル'});
//});

//app.listen(8000)


//express and router


app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//ファイルを直接見られる


app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));　//次のハンドラに引数404で実行
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  //開発環境でのみerrorの詳細を返す

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
