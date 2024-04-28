var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var temperaturaSchema = new Schema({
  index: Number,
  sensor_id: Number,
  temperature: Number,
  humidity: Number,
  date: Date
}, { collection: 'temperaturas' });

var Temperatura = mongoose.model('Temperatura', temperaturaSchema);

router.get('/city/temp', async function (req, res, next) {
  try {
    var temperaturas = await Temperatura.find({});
    res.json(temperaturas);
  } catch (error) {
    next(error);
  }
});

router.get('/city/temp/:id', async function(req, res, next) {
  try {
    var id = req.params.id;
    var temperatura = await Temperatura.findOne({index: id});
    if (temperatura) {
      res.json(temperatura);
    } else {
      next(createError(404));
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;