// Propósito: Realizar las operaciones de los sensores
var moment = require('moment');
var createError = require('http-errors');

//importar las funciones de ayuda
const indexHelper = require('../helpers/index');
const dateHelper = require('../helpers/dateHelper');
const ordenHelper = require('../helpers/ordenHelper');

//importar el modelo de los sensores
const Sensores = require('../models/Sensores');

//función para obtener los datos de los sensores
exports.getSensoresData = (req, res, next) => {
    Sensores.find({}, function(err, sensoresData) {
        if (err) {
            return next(err);
        }
        res.json(sensoresData);
    });
};

//función para obtener los datos de un sensor
exports.getSensorData = async function (req, res, next) {
  try {
    const numid = req.params.numid;
    let query = { numid: numid };

    let responseData;

    // Si no hay parámetros en la consulta, busca el sensor
    if (Object.keys(req.query).length === 0) {
        const sensor = await Sensores.findOne(query);
        if (!sensor) {
            throw createError(404, 'Sensor no encontrado');
        }
        responseData = sensor;
    } 
    else if (req.query.desde && req.query.hasta) {
        responseData = await dateHelper.filterByDate(numid, req.query.desde, req.query.hasta);
    } 
    else if (req.query.orden){
        responseData = await ordenHelper.filterByOrden(numid, req.query.orden);
    }
    // Si hay otros parámetros, llama a helpers.getCollection
    else {
        const sensor = await Sensores.findOne(query);
        if (!sensor) {
            throw createError(404, 'Sensor no encontrado');
        }
        for (let param in req.query) {
            if (!sensor.allowed_params.includes(param)) {
                throw new Error(`El parámetro '${param}' no está permitido`);
            } else {
                responseData = await indexHelper.getCollection(sensor.collectionName, sensor.numid, req.query);
            }
        }
    }

    if (!responseData) {
        responseData = "Algo has hecho mal, revisa los parámetros de la consulta";
    }

    res.json(responseData);
  } catch (err) {
    next(err);
  }
};


