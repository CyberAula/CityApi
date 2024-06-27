var Infrarrojos = require('../models/Infrarrojos.js');

//función para obtener todos los datos de los trenes
exports.getInfrarrojoses = async function (req, res, next) {
    try {
      var Infrarrojoses = await Infrarrojos.find({});
      console.log(Infrarrojoses); 
      res.json(Infrarrojoses); 
    } catch (error) {
      console.error(error); 
      next(error); 
    }
};

//función para obtener el estado de un Infrarrojos específico
exports.getEstadoInfrarrojos = async function (sensor_id, commuterValue) {
    var Infrarrojoses = await Infrarrojos.find({
      sensor_id: sensor_id,
      'commuter.value': commuterValue
    });
  
    console.log(Infrarrojoses); 
    return Infrarrojoses; 
  }
