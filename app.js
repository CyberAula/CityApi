var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json()); // para solicitudes con Content-Type: application/json
app.use(express.urlencoded({ extended: true })); // para solicitudes con Content-Type: application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//conexión a la BBDD MongoDB
mongoose.connect('mongodb://localhost/LEGOCity', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch(err => console.error('No se pudo conectar a MongoDB', err));

// error handler
app.use(function(err, req, res, next) {
  // maneja el error de alguna manera, por ejemplo:
  res.status(err.status || 500);
  res.render('error', { error: err });
});

module.exports = app;
