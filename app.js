var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
//var Twitter = require('twitter');
var OAuth = require('oauthio');
var session = require('express-session');

//環境変数の呼び出し
require('dotenv').config();
const publickey = process.env.NODE_ENV_PublicKey;
const secretKey = process.env.NODE_ENV_SecretKey;
const consumerKey = process.env.NODE_ENV_ConsumerKey;
const consumerSecret = process.env.NODE_ENV_ConsumerSecret;

//route に使う用
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
app.use(helmet());

//aouth.ioはexpress-sessionが必要
app.use(session({
  secret: 'erikaoshi',
  resave: false,
  saveUninitialized: true
}));

//oauth.ioのリクエストオブジェクト
//var twitter = OAuth.create('twitter');

//ここからOAuth.ioで認証とツイート
OAuth.initialize(publickey, secretKey);
app.get('/signin', OAuth.auth('twitter', 'http://localhost:3000/oauth/redirect'));

app.get('/oauth/redirect', OAuth.redirect(function(result, req, res) {
    if (result instanceof Error) {
        res.send(500, "error: " + result.message);
        return;
    }
    result.me().done(function(me) {
        console.log(me);
        //res.send(200, JSON.stringify(me));
        //res.redirect('/');
    });
    result.post('twitter', 'hello world')
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//ファイルを直接見られる


app.use('/', indexRouter);
app.use('/tweet',indexRouter);
app.use('/users', usersRouter);

//tweetをクリックしたら

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