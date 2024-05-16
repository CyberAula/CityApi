// Propósito: Realizar las operaciones de los sensores
var moment = require('moment');
var createError = require('http-errors');

//importar las funciones de ayuda
const helpers = require('../helpers/index');

//importar los modelos
const Sensores = require('../models/Sensores');
const Temperatura = require('../models/Temperatura');
const Rail = require('../models/Rail');
const Ultrasonido = require('../models/Ultrasonido');

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
    // Si los parámetros desde y hasta están presentes, realiza el filtrado por fechas
    else if (req.query.desde && req.query.hasta) {
        let desde = moment(req.query.desde);
        let hasta = moment(req.query.hasta);

        //validar las fechas
        if (!desde.isValid() || !hasta.isValid()) {
            throw new Error('Las fechas proporcionadas son inválidas');
        }

        desde = desde.toDate();
        hasta = hasta.toDate();
        switch (numid) {
            case '1':
                responseData = await Temperatura.find({
                    fecha: { $gte: desde, $lte: hasta }
                });
                break;
            case '2':
                responseData = await Rail.find({
                    fecha: { $gte: desde, $lte: hasta }
                });
                break;
            case '3':
                responseData = await Ultrasonido.find({
                    fecha: { $gte: desde, $lte: hasta }
                });
                break;
            default:
                throw createError(404, 'Sensor no encontrado');
        }
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
                responseData = await helpers.getCollection(sensor.collectionName, sensor.numid, req.query);
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


