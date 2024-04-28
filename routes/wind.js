var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definir el esquema de los datos de viento
var vientoSchema = new Schema({
    index: Number,
    velocidad: Number,
    direccion: String,
    date: Date
  }, { collection: 'vientos' });

  var Viento = mongoose.model('Viento', vientoSchema);
  
  // Ruta para obtener los datos de viento
router.get('/city/wind', async function (req, res, next) {
    try {
      // Consultar los datos de viento en la base de datos
      var vientos = await Viento.find({});
      res.json(vientos); // Enviar los datos de viento como respuesta
    } catch (error) {
      next(error); // Pasar el error al siguiente middleware
    }
});

router.get('/city/wind/:id', async function(req, res, next) {
    try {
      var id = req.params.id;
      var vientos = await Viento.findOne({index: id});
      if (vientos) {
        res.json(vientos);
      } else {
        next(createError(404));
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = router; 

