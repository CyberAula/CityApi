var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var fs = require('fs');
var path = require('path');

//esquema de los datos de la temperatura
const temperatureSchema = new mongoose.Schema({ 
  sensor_name: String,
  temperature: Number,
  humidity: Number,
  date: Date
  }, {
     versionKey: false
});

const TemperaturaEste = mongoose.model('TemperaturaEste', temperatureSchema);

//devuelve todas las temperaturas registradas por el sensor en el este.
router.get('/city/temperaturaEste', async function (req, res, next) {
  try {
    var temperaturaestes = await TemperaturaEste.find({});
    console.log(temperaturaestes); 
    res.json(temperaturaestes); 
  } catch (error) {
    console.error(error); 
    next(error); 
  }
});

const TemperaturaOeste = mongoose.model('TemperaturaOeste', temperatureSchema);

//devuelve todas las temperaturas registradas por el sensor en el oeste.
router.get('/city/temperaturaOeste', async function (req, res, next) {
  try {
    var temperaturaoestes = await TemperaturaOeste.find({});
    console.log(temperaturaoestes); 
    res.json(temperaturaoestes);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//esquema de los datos de viento
const VientoSchema = new mongoose.Schema({
  sensor_name: String,
  velocidad: Number,
  direccion: String,
  date: Date
}, { versionKey: false });

const Viento = mongoose.model('Viento', VientoSchema);

//ruta al archivo sensores.json
var sensoresFilePath = path.join(__dirname, '../DataCollection', 'sensores.json');

router.get('/city/:sensorType/:index', async (req, res, next) => {
  try {
    // Si no se proporcionan las fechas 'desde' y 'hasta', devuelve la información del sensor
    if (!req.query.desde && !req.query.hasta) {
      fs.readFile(sensoresFilePath, 'utf8', function(err, data) {
        if (err) {
          return next(err);
        }
        try {
          var sensoresData = JSON.parse(data).sensores;
          var sensorType = req.params.sensorType;
          var index = req.params.index;
          // Encuentra el sensor con el tipo y el índice especificados
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
});

module.exports = router;




