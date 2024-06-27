var Temperatura = require('../models/Temperatura.js')

//función para obtener la temperatura de la zona norte
exports.getTemperatura = async function (req, res, next) {
  try {
    var temperaturas = await Temperatura.find({});
    console.log(temperaturas); 
    res.json(temperaturas); 
  } catch (error) {
    console.error(error); 
    next(error); 
  }
};





