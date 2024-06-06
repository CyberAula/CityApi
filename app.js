var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var { swaggerUi, specs } = require('./swagger');

// Rutas
var indexRouter = require('./routes/index');
var sensoresRouter = require('./routes/sensores');
var tempRouter = require('./routes/temp');
var railRouter = require('./routes/rail');
var ultrasonidoRouter = require('./routes/ultrasonido');
var farolasRouter = require('./routes/fotorresistor');
var tiempoRealRouter = require('./routes/tiempoReal');
var continuoRouter = require('./routes/continuo');

var app = express();

// Socket.io
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');

setInterval(() => {
  socket.emit('sensorData', {
    timestamp: new Date(),
    value: Math.random() // Valor aleatorio para el ejemplo
  });
}, 5000);
});

// Conexión a la base de datos
mongoose.connect('mongodb://0.0.0.0/Datos', {
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

server.listen(app.get('port'), function () {
  console.log('Express and Socket.IO server listening on port ' + app.get('port'));
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/', indexRouter);
app.use('/', sensoresRouter);
app.use('/', tempRouter);
app.use('/', railRouter);
app.use('/', ultrasonidoRouter);
app.use('/', farolasRouter);
app.use('/', tiempoRealRouter);
app.use('/', continuoRouter);

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
