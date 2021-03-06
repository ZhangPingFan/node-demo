var express = require('express');
//var favicon = require('serve-favicon');
var logger = require('morgan');
//var path = require('path');
var bodyParser = require('body-parser');
var compress = require('compression');

var index = require('./routes/index');

var app = express();
var server = require('http').Server(app);
var port = 3001;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(compress());
app.use(express.static('public'));
app.use('/', index);

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
