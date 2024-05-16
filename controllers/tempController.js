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

//función para obtener la temperatura de un sensor específico en un rango
exports.getMinAndMaxTemp = async function (sensor_id, min, max) {
  
  //validar los valores min y max
  if (isNaN(min) || isNaN(max)) {
    throw new Error('Los valores min y max proporcionados son inválidos');
  }

  var temperaturas = await Temperatura.find({
    sensor_id: sensor_id,
    'temp.value': { $gte: min, $lte: max }
  });

  console.log(temperaturas); 
  return temperaturas; 

}

//función para obtener la humedad de un sensor específico en un rango
exports.getMinAndMaxHumidity = async function (sensor_id, min, max) {
  
  //validar los valores min y max
  if (isNaN(min) || isNaN(max)) {
    throw new Error('Los valores min y max proporcionados son inválidos');
  }

  var humedades = await Temperatura.find({
    sensor_id: sensor_id,
    'humidity.value': { $gte: min, $lte: max }
  });

  console.log(humedades); 
  return humedades; 
}
