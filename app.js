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
var railRouter = require('./routes/rail');

const { type } = require('os');

var app = express();

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

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
    components: {
      schemas: {
        Sensores:{
          type: 'object',
          properties: {
            index: {
              type: 'string',
              example: '3',
              description: 'El índice del sensor'
            },
            name: {
              type: 'string',
              example: 'Sensor temperatura oeste',
              description: 'El nombre del sensor'
            },
            desc: {
              type: 'string',
              example: 'Este sensor mide la temperatura en el oeste de la ciudad',
              description: 'La descripción del sensor'
            },
            sensorType: {
              type: 'string',
              example: 'temperatura',
              description: 'El tipo de sensor'
            },
            linkDoc: {
              type: 'string',
              example: '',
              description: 'El enlace a la documentación del sensor'
            },
            exampleQueryDateRange: {
              type: 'string',
              example: '',
              description: 'Ejemplo de consulta de rango de fechas'
            },
            visible: {
              type: 'string',
              example: 'true',
              description: 'La visibilidad del sensor'
            }
          }
        },
        Temperatura: {
          type: 'object',
          properties: {
            nombre_sensor: {
              type: 'string',
              example: 'Sensor temperatura',
              description: 'El nombre del sensor'
            },
            temperatura: {
              type: 'number',
              example:'22.5',
              description: 'La temperatura en grados Celsius'
            },
            humedad: {
              type: 'number',
              example:'65%',
              description: 'La humedad en porcentaje'
            },
            fecha: {
              type: 'string',
              format: 'date-time',
              example:'2024-05-08T08:31:44.173Z',
              description: 'La fecha y hora cuando se tomaron los datos'
            }
          },
        },
        TrenFrecuencia: {
          type: 'object',
          properties: {
            nombre_sensor: {
                  type: 'string',
                  example:'Sensor frecuencia tren',
                  description: 'El nombre del sensor'
              },
              frecMañana: {
                  type: 'number',
                  example:'2',
                  description: 'La frecuencia del tren por la mañana'
              },
              frecTarde: {
                  type: 'number',
                  example:'3',
                  description: 'La frecuencia del tren por la tarde'
              },
              frecNoche: {
                  type: 'number',
                  example:'8',
                  description: 'La frecuencia del tren por la noche'
              },
              fecha: {
                  type: 'string',
                  format: 'date-time',
                  example:'2024-05-08T12:29:05.464Z',
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
app.use('/', railRouter);

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
