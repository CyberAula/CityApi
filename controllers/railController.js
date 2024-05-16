var Rail = require('../models/Rail.js');

//función para obtener todos los datos de los trenes
exports.getRailes = async function (req, res, next) {
    try {
      var railes = await Rail.find({});
      console.log(railes); 
      res.json(railes); 
    } catch (error) {
      console.error(error); 
      next(error); 
    }
};

//función para obtener el estado de un rail específico
exports.getEstadoRail = async function (sensor_id, commuterValue) {
    var railes = await Rail.find({
      sensor_id: sensor_id,
      'commuter.value': commuterValue
    });
  
    console.log(railes); 
    return railes; 
  }
