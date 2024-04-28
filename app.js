var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tempRouter = require('./routes/temp');
var windRouter = require('./routes/wind');
var sensoresRouter = require('./routes/sensores');

var app = express();

// Conexión a la base de datos
mongoose.connect('mongodb://0.0.0.0/Sensor', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected to MongoDB");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(express.json()); // para solicitudes con Content-Type: application/json
app.use(express.urlencoded({ extended: true })); // para solicitudes con Content-Type: application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', tempRouter);
app.use('/', windRouter);
app.use('/', sensoresRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', { message: err.message || 'An error occurred', error: err });
});

module.exports = app;
