var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

// Ruta al archivo JSON de sensores
var sensoresFilePath = path.join(__dirname, '../DataCollection', 'sensores.json');

// Manejador de ruta para obtener los datos de los sensores
router.get('/city/sensores', function(req, res, next) {
  // Lee el archivo JSON de sensores
  fs.readFile(sensoresFilePath, 'utf8', function(err, data) {
    if (err) {
      // Si hay un error al leer el archivo, envía un error 500
      return next(err);
    }
    try {
      // Parsea los datos del archivo JSON
      var sensoresData = JSON.parse(data);
      // Envía los datos como respuesta
      res.json(sensoresData);
    } catch (parseError) {
      // Si hay un error al parsear el JSON, envía un error 500
      return next(parseError);
    }
  });
});

router.get('/city/sensores/:id', function(req, res, next) {
  fs.readFile(sensoresFilePath, 'utf8', function(err, data) {
    if (err) {
      return next(err);
    }
    try {
      var sensoresData = JSON.parse(data);
      var id = parseInt(req.params.id, 10);
      var sensor = sensoresData.find(sensor => sensor.index === id);
      if (sensor) {
        res.json(sensor);
      } else {
        next(createError(404));
      }
    } catch (parseError) {
      return next(parseError);
    }
  });
});

module.exports = router;