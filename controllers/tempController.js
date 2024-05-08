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