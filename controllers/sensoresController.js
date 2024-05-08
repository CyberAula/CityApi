var fs = require('fs');
var path = require('path');
var moment = require('moment');
var createError = require('http-errors');

var sensoresFilePath = path.join(__dirname, '../DataCollection', 'sensores.json');

var TemperaturaEste = require('../models/TemperaturaEste.js');
var TemperaturaOeste = require('../models/TemperaturaOeste.js');
var Viento = require('../models/Viento.js');

var vientoController = require('./vientoController.js');
var tempController = require('./tempController.js');

exports.getSensoresData = (req, res, next) => {
    fs.readFile(sensoresFilePath, 'utf8', function(err, data) {
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

exports.getDateData = async (req, res, next) => {
    try {
        //si no se proporcionan las fechas 'desde' y 'hasta', devuelve la información del sensor
        if (!req.query.desde && !req.query.hasta && !req.query.direccion && !req.query.min && !req.query.max) {
          fs.readFile(sensoresFilePath, 'utf8', function(err, data) {
            if (err) {
              return next(err);
            }
            try {
              var sensoresData = JSON.parse(data).sensores;
              var sensorType = req.params.sensorType;
              var index = req.params.index;
              //encuentra el sensor con el tipo y el índice especificados
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

        } else if (req.query.direccion) {
            return await vientoController.getWindDataByDirection(req, res, next);
        } else if (req.query.min !== undefined || req.query.max !== undefined) {
            return await tempController.getTemperaturaInRange(req, res, next);
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
