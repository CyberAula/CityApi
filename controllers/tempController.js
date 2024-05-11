var TemperaturaNorte = require('../models/TemperaturaNorte.js')
var TemperaturaSur = require('../models/TemperaturaSur.js')
var TemperaturaEste = require('../models/TemperaturaEste.js');
var TemperaturaOeste = require('../models/TemperaturaOeste.js');

//función para obtener la temperatura de la zona norte
exports.getTemperaturaNorte = async function (req, res, next) {
  try {
    var temperaturanortes = await TemperaturaNorte.find({});
    console.log(temperaturanortes); 
    res.json(temperaturanortes); 
  } catch (error) {
    console.error(error); 
    next(error); 
  }
};

//función para obtener la temperatura de la zona sur
exports.getTemperaturaSur = async function (req, res, next) {
  try {
    var temperaturasures = await TemperaturaSur.find({});
    console.log(temperaturasures); 
    res.json(temperaturasures);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//función para obtener la temperatura de la zona este
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

//función para obtener la temperatura de la zona oeste
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

//función para obtener la temperatura de un sensor específico en un rango
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
      Model = TemperaturaNorte;
    } else if (index === '2') {
      Model = TemperaturaSur;
    } else if (index === '3') {
      Model = TemperaturaEste;
    } else if (index === '4') {
      Model = TemperaturaOeste;
    } else {
      throw new Error('La dirección proporcionada es inválida');
    }

    var temperaturas = await Model.find({
      temperatura: { $gte: min, $lte: max }
    });

    console.log(temperaturas); 
    res.json(temperaturas); 
  } catch (error) {
    console.error(error); 
    next(error); 
  }
};

//función para obtener la temperatura mínima de un sensor específico
exports.getTemperaturaMin = async function (req, res, next) {
    try {
      let index = req.params.index;
  
      let Model;
      if (index === '1') {
        Model = TemperaturaNorte;
      } else if (index === '2') {
        Model = TemperaturaSur;
      } else if (index === '3') {
        Model = TemperaturaEste;
      } else if (index === '4') {
        Model = TemperaturaOeste;
      } else {
        throw new Error('La dirección proporcionada es inválida');
      }
  
      var temperaturaMin = await Model.findOne().sort({temperatura: 1});
  
      console.log(temperaturaMin); 
      res.json(temperaturaMin); 
    } catch (error) {
      console.error(error); 
      next(error); 
    }
};

//función para obtener la temperatura máxima de un sensor específico
exports.getTemperaturaMax = async function (req, res, next) {
    try {
      let index = req.params.index;
  
      let Model;
      if (index === '1') {
        Model = TemperaturaNorte;
      } else if (index === '2') {
        Model = TemperaturaSur;
      } else if (index === '3') {
        Model = TemperaturaEste;
      } else if (index === '4') {
        Model = TemperaturaOeste;
      } else {
        throw new Error('La dirección proporcionada es inválida');
      }
  
      var temperaturaMax = await Model.findOne().sort({temperatura: -1});
  
      console.log(temperaturaMax); 
      res.json(temperaturaMax); 
    } catch (error) {
      console.error(error); 
      next(error); 
    }
};
