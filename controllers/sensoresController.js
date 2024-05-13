var fs = require('fs');
var path = require('path');
var moment = require('moment');
var createError = require('http-errors');

//ruta al archivo sensores.json
var sensoresFilePath = path.join(__dirname, '../DataCollection', 'sensores.json');

//rutas a los modelos
var TemperaturaNorte = require('../models/TemperaturaNorte.js');
var TemperaturaSur = require('../models/TemperaturaSur.js');
var TemperaturaEste = require('../models/TemperaturaEste.js');
var TemperaturaOeste = require('../models/TemperaturaOeste.js');
var Viento = require('../models/Viento.js');
var TrenFrecuencia = require('../models/TrenFrecuencia.js');
var Luz = require('../models/Luz.js')
var TraficoCentro = require('../models/TraficoCentro.js');
var TraficoAfueras = require('../models/TraficoAfueras.js');
var Residuos = require('../models/Residuos.js');

//rutas a los controladores
var vientoController = require('./vientoController.js');
var tempController = require('./tempController.js');
var traficoController = require('./traficoController.js');

//función para obtener los datos de los sensores
exports.getSensoresData = (req, res, next) => {
    fs.readFile(sensoresFilePath, 'utf8', function (err, data) {
        if (err) {
            return next(err);
        }
        try {
            var sensoresData = JSON.parse(data);
            res.json(sensoresData);
        } catch (parseError) {
            return next(parseError);
        }
    });
}

//función para obtener los datos de un sensor específico y por rango de fechas
exports.getDateData = async (req, res, next) => {
    try {

        const conditions = [
            { check: () => req.query.direccion, action: () => vientoController.getDireccion(req, res, next) },
            { check: () => req.query.congestion, action: () => traficoController.getCongestion(req, res, next)},
            { check: () => req.query.mayorque !== undefined && req.query.menorque !== undefined, action: () => vientoController.getVientosEntre(req, res, next) },
            { check: () => req.query.mayorque !== undefined, action: () => vientoController.getVientosMayorQue(req, res, next) },
            { check: () => req.query.menorque !== undefined, action: () => vientoController.getVientosMenorQue(req, res, next) },
            { check: () => req.query.min !== undefined && req.query.max !== undefined, action: () => tempController.getTemperaturaInRange(req, res, next) },
            { check: () => req.query.min !== undefined, action: () => tempController.getTemperaturaMin(req, res, next) },
            { check: () => req.query.max !== undefined, action: () => tempController.getTemperaturaMax(req, res, next) },
        ];

        for (let condition of conditions) {
            if (condition.check()) {
                return await condition.action();
            }
        }

        //si no se proporcionan las fechas 'desde' y 'hasta', devuelve la información del sensor
        if (!req.query.desde && !req.query.hasta) {
            fs.readFile(sensoresFilePath, 'utf8', function (err, data) {
                if (err) {
                    return next(err);
                }
                try {
                    var sensoresData = JSON.parse(data).sensores;
                    var sensorType = req.params.sensorType;
                    var index = req.params.index;
                    var sensor = sensoresData.find(sensor => sensor.sensorType === sensorType && sensor.index === index);
                    if (sensor) {
                        res.json(sensor);
                    } else {
                        next(createError(404));
                    }
                } catch (parseError) {
                    return next(parseError);
                }
            });
        } else {

            let desde = moment(req.query.desde);
            let hasta = moment(req.query.hasta);

            //validar las fechas
            if (!desde.isValid() || !hasta.isValid()) {
                throw new Error('Las fechas proporcionadas son inválidas');
            }

            desde = desde.toDate();
            hasta = hasta.toDate();

            //determinar el nombre del sensor basado en el tipo de sensor y el índice
            let nombre_sensor;
            let sensorData;
            if (req.params.sensorType === 'temperatura') {
                if (req.params.index === '1') {
                    nombre_sensor = 'Sensor temperatura norte';
                    sensorData = await TemperaturaNorte.find({
                        nombre_sensor: nombre_sensor,
                        fecha: { $gte: desde, $lte: hasta }
                    });
                } else if (req.params.index === '2') {
                    nombre_sensor = 'Sensor temperatura sur';
                    sensorData = await TemperaturaSur.find({
                        nombre_sensor: nombre_sensor,
                        fecha: { $gte: desde, $lte: hasta }
                    });
                } else if (req.params.index === '3') {
                    nombre_sensor = 'Sensor temperatura este';
                    sensorData = await TemperaturaEste.find({
                        nombre_sensor: nombre_sensor,
                        fecha: { $gte: desde, $lte: hasta }
                    });
                } else if (req.params.index === '4') {
                    nombre_sensor = 'Sensor temperatura oeste';
                    sensorData = await TemperaturaOeste.find({
                        nombre_sensor: nombre_sensor,
                        fecha: { $gte: desde, $lte: hasta }
                    });
                }
            } else if (req.params.sensorType === 'viento' && req.params.index === '5') {
                nombre_sensor = 'Sensor viento molino';
                sensorData = await Viento.find({
                    nombre_sensor: nombre_sensor,
                    fecha: { $gte: desde, $lte: hasta }
                });
            } else if (req.params.sensorType === 'trenfrecuencia' && req.params.index === '6') {
                nombre_sensor = 'Sensor frecuencia tren';
                sensorData = await TrenFrecuencia.find({
                    nombre_sensor: nombre_sensor,
                    fecha: { $gte: desde, $lte: hasta }
                });
            } else if (req.params.sensorType === 'luz' && req.params.index === '7') {
                nombre_sensor = 'Sensor luz';
                sensorData = await Luz.find({
                    nombre_sensor: nombre_sensor,
                    fecha: { $gte: desde, $lte: hasta }
                });
            } else if (req.params.sensorType === 'trafico') {
                if (req.params.index === '8') {
                    nombre_sensor = 'Sensor tráfico centro';
                    sensorData = await TraficoCentro.find({
                        nombre_sensor: nombre_sensor,
                        fecha: { $gte: desde, $lte: hasta }
                    });
                } else if (req.params.index === '9') {
                    nombre_sensor = 'Sensor tráfico afueras';
                    sensorData = await TraficoAfueras.find({
                        nombre_sensor: nombre_sensor,
                        fecha: { $gte: desde, $lte: hasta }
                    });
                }
            } else if (req.params.index === '10') {
                nombre_sensor = 'Sensor residuos';
                sensorData = await Residuos.find({
                    nombre_sensor: nombre_sensor,
                    fecha: { $gte: desde, $lte: hasta }
                });
            } else {
                throw new Error('Tipo de sensor o índice inválido');
            }

            if (!sensorData || sensorData.length === 0) {
                res.status(404).json({ message: 'No data found' });
            } else {
                res.json(sensorData);
            }
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};
