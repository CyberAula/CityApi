var fs = require('fs');
var path = require('path');
var moment = require('moment');
var createError = require('http-errors');

//ruta al archivo sensores.json
var sensoresFilePath = path.join(__dirname, '../DataCollection', 'sensores.json');

//rutas a los modelos
var TemperaturaEste = require('../models/TemperaturaEste.js');
var TemperaturaOeste = require('../models/TemperaturaOeste.js');
var Viento = require('../models/Viento.js');
var TrenFrecuencia = require('../models/TrenFrecuencia.js');

//rutas a los controladores
var vientoController = require('./vientoController.js');
var tempController = require('./tempController.js');

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
            let sensor_name;
            let sensorData;
            if (req.params.sensorType === 'temperatura' && req.params.index === '1') {
                sensor_name = 'Sensor temperatura este';
                sensorData = await TemperaturaEste.find({
                    sensor_name: sensor_name,
                    date: { $gte: desde, $lte: hasta }
                });
            } else if (req.params.sensorType === 'temperatura' && req.params.index === '3') {
                sensor_name = 'Sensor temperatura oeste';
                sensorData = await TemperaturaOeste.find({
                    sensor_name: sensor_name,
                    date: { $gte: desde, $lte: hasta }
                });
            } else if (req.params.sensorType === 'viento' && req.params.index === '2') {
                sensor_name = 'Sensor viento molino';
                sensorData = await Viento.find({
                    sensor_name: sensor_name,
                    date: { $gte: desde, $lte: hasta }
                });
            } else if (req.params.sensorType === 'trenfrecuencia' && req.params.index === '4') {
                sensor_name = 'Sensor frecuencia tren';
                sensorData = await TrenFrecuencia.find({
                    sensor_name: sensor_name,
                    date: { $gte: desde, $lte: hasta }
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
