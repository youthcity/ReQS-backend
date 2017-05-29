var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var config = require('config-lite')({
  filenames: 'default',
  config_basedir: __dirname,
  config_dir: 'config'
});
var routes = require('./routes');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 设置静态文件
app.use(express.static(path.join(__dirname, 'public')));

// session中间件
app.use(session({
  name: config.session.key,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false, //设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge,
    secure: false,
  },
  store: new MongoStore({
    url: config.mongodb
  })
}));

// allow cross
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', req.header('Origin'));
   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept');
   res.header('Access-Control-Allow-Credentials', true);
   next();
});

routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
