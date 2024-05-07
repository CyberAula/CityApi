var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var createError = require('http-errors');


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

module.exports = router;