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
var ultrasonidoRouter = require('./routes/ultrasonido');
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
            numid: {
              type: 'number',
              example: '3',
              description: 'El índice del sensor'
            },
            name: {
              type: 'string',
              example: 'Temperatura y Humedad',
              description: 'El nombre del sensor'
            },
            collectionName: {
              type: 'string',
              example: 'Hygrothermograph',
              description: 'Colección a la que pertenece el sensor.'
            },
            allowed_params: {
              type: '[string]',
              example: '["propiedad", "min", "max"]',
              description: 'Parámetros permitidos en su query.'
            },
            desc: {
              type: 'string',
              example: 'El higrotermógrafo es una herramienta importante para darnos datos sobre la temperatura y la humedad de nuestro ambiente. Aquí  utilizaremos la raspberry  Pi para leer los datos de Temperatura y Humedad del Módulo DHT11.',
              description: 'La descripción del sensor'
            },
            uso: {
              type: 'string',
              example: 'Medir temperatura y humedad en la sala',
              description: 'Para qué se va a utilizar el sensor.'
            },
            exampleQueryDateRange: {
              type: 'string',
              example: '/sensores/1?desde=2024-05-06T22:53:14.205Z&hasta=2024-05-07T01:12:15.758Z',
              description: 'Ejemplo de consulta de rango de fechas'
            },
            visible: {
              type: 'string',
              example: 'true',
              description: 'La visibilidad del sensor'
            },
            realtime: {
              type: 'string',
              example: 'true',
              description: 'Indica si el sensor ofrece datos en tiempo real o no.'
            },
          }
        },
        Temperatura: {
          type: 'object',
          properties: {
            sensor_id: {
              type: 'number',
              example: 1,
              description: 'El índice del sensor'
            },
            nombre_sensor: {
              type: 'string',
              example: 'Sensor Temperatura y Humedad',
              description: 'El nombre del sensor.'
            },
            temp: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  default: 'Property'
                },
                value: {
                  type: 'number',
                  example: 22.5,
                  description: 'La temperatura en grados Celsius'
                }
              }
            },
            humidity: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  default: 'Property'
                },
                value: {
                  type: 'number',
                  example: 65,
                  description: 'La humedad en porcentaje'
                }
              }
            },
            fecha: {
              type: 'string',
              format: 'date-time',
              example: '2024-05-08T08:31:44.173Z',
              description: 'La fecha y hora cuando se tomaron los datos'
            }
          },
        },
        Raíl: {
          type: 'object',
          properties: {
            sensor_id: {
              type: 'number',
              example: 2,
              description: 'El índice del sensor'
            },
            nombre_sensor: {
              type: 'string',
              example: 'Conmutador y Servomotor',
              description: 'El nombre del sensor'
            },
            commuter: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  default: 'Property'
                },
                value: {
                  type: 'number',
                  example: 2,
                  description: 'La frecuencia del tren'
                }
              }
            },
            fecha: {
              type: 'string',
              format: 'date-time',
              example: '2024-05-08T12:29:05.464Z',
              description: 'La fecha y hora cuando se tomaron los datos'
            }
          },
        },
      Ultrasonido: {
        type: 'object',
        properties: {
          sensor_id: {
            type: 'number',
            example: 3,
            description: 'El índice del sensor'
          },
          nombre_sensor: {
            type: 'string',
            example: 'Ultrasonido',
            description: 'El nombre del sensor'
          },
          ultasonic: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                default: 'Property'
              },
              value: {
                type: 'number',
                example: 458.76,
                description: 'La distancia entre dos elementos en metros'
              }
            }
          },
          fecha: {
            type: 'string',
            format: 'date-time',
            example: '2024-05-08T12:29:05.464Z',
            description: 'La fecha y hora cuando se tomaron los datos'
          }
        },
      }
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
app.use('/', ultrasonidoRouter);

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
