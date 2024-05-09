var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var swaggerUi = require('swagger-ui-express');
var swaggerJsdoc = require('swagger-jsdoc');

var indexRouter = require('./routes/index');
var sensoresRouter = require('./routes/sensores');
var tempRouter = require('./routes/temp');
var vientoRouter = require('./routes/viento');
var trenRouter = require('./routes/tren');

var app = express();

// Conexión a la base de datos
mongoose.connect('mongodb://0.0.0.0/Sensores', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected to MongoDB");
});

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
    components: {
      schemas: {
        TemperaturaEste: {
          type: 'object',
          properties: {
            sensor_name: {
              type: 'string',
              description: 'El nombre del sensor'
            },
            temperature: {
              type: 'number',
              description: 'La temperatura en grados Celsius'
            },
            humidity: {
              type: 'number',
              description: 'La humedad en porcentaje'
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'La fecha y hora cuando se tomaron los datos'
            }
          },
        },
        TemperaturaOeste: {
          type: 'object',
          properties: {
            sensor_name: {
              type: 'string',
              description: 'El nombre del sensor'
            },
            temperature: {
              type: 'number',
              description: 'La temperatura en grados Celsius'
            },
            humidity: {
              type: 'number',
              description: 'La humedad en porcentaje'
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'La fecha y hora cuando se tomaron los datos'
            }
          },
        },
        Viento: {
          type: 'object',
          properties: {
            sensor_name: {
              type: 'string',
              description: 'El nombre del sensor',
            },
            velocidad: {
              type: 'number',
              description: 'La velocidad del viento en km/h',
            },
            direccion: {
              type: 'string',
              description: 'La dirección del viento',
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'La fecha y hora cuando se tomaron los datos'
            },
          },
        },
        TrenFrecuencia: {
          type: 'object',
          properties: {
              sensor_name: {
                  type: 'string',
                  description: 'El nombre del sensor'
              },
              frecMañana: {
                  type: 'number',
                  description: 'La frecuencia del tren por la mañana'
              },
              frecTarde: {
                  type: 'number',
                  description: 'La frecuencia del tren por la tarde'
              },
              frecNoche: {
                  type: 'number',
                  description: 'La frecuencia del tren por la noche'
              },
              date: {
                  type: 'string',
                  format: 'date-time',
                  description: 'La fecha y hora cuando se tomaron los datos'
              }
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/', indexRouter);
app.use('/', sensoresRouter);
app.use('/', tempRouter);
app.use('/', vientoRouter);
app.use('/', trenRouter);

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
