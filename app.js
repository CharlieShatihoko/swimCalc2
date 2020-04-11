var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var session = require('express-session');

//route に使う用
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var resultRouter = require('./routes/result');
var addData = require('./routes/addData');
var afterAdd = require('./routes/afterAdd');
var TweetPage = require('./routes/tweet');


//データベース関係
//モデルの読み込み
var Swimmer = require('./models/swimmer');
var Competition = require('./models/competition');
var Record = require('./models/record');
var Style = require('./models/style');
Record.sync().then(()=>{
  Swimmer.belongsTo(Record, {foreignKey: 'swimmerId'});
  Swimmer.sync();
  Competition.belongsTo(Record, {foreignKey: 'competitionId'});
  Competition.sync();
  Style.belongsTo(Record, {foreignKey: 'styleId'});
  Style.sync();
});

//expressの各種設定
var app = express();
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//ファイルを直接見られる


//express-session
app.use(session({
  secret: 'erikaoshi',
  resave: false,
  saveUninitialized: true
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');




//routerの利用
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/result',resultRouter);
app.use('/addData', addData);
app.use('/afterAdd', afterAdd);
app.use('/tweet',TweetPage);

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