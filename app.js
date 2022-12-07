var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require("express-fileupload")
var indexRouter = require('./src/routes/index');
const Cloudinary = require("cloudinary").v2;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//↓Middleware for upload files
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/',
  limits: { fileSize: 50 * 1024 * 1024 },
  abortOnLimit: true,
}));
//cloudinary config
Cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API, 
  api_secret: process.env.CLOUDINARY_SECRET_APY,
  secure: true
});
//Routes
app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
