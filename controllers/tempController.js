var TemperaturaEste = require('../models/TemperaturaEste.js');
var TemperaturaOeste = require('../models/TemperaturaOeste.js');

exports.getTemperaturaEste = async function (req, res, next) {
  try {
    var temperaturaestes = await TemperaturaEste.find({});
    console.log(temperaturaestes); 
    res.json(temperaturaestes); 
  } catch (error) {
    console.error(error); 
    next(error); 
  }
};

exports.getTemperaturaOeste = async function (req, res, next) {
  try {
    var temperaturaoestes = await TemperaturaOeste.find({});
    console.log(temperaturaoestes); 
    res.json(temperaturaoestes);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getTemperaturaInRange = async function (req, res, next) {
  try {
    let min = parseFloat(req.query.min);
    let max = parseFloat(req.query.max);
    let index = req.params.index;

    // Validar los valores min y max
    if (isNaN(min) || isNaN(max)) {
      throw new Error('Los valores min y max proporcionados son inválidos');
    }

    let Model;
    if (index === '1') {
      Model = TemperaturaEste;
    } else if (index === '3') {
      Model = TemperaturaOeste;
    } else {
      throw new Error('La dirección proporcionada es inválida');
    }

    var temperaturas = await Model.find({
      temperature: { $gte: min, $lte: max }
    });

    console.log(temperaturas); 
    res.json(temperaturas); 
  } catch (error) {
    console.error(error); 
    next(error); 
  }
};