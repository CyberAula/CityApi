var Luz = require('../models/Luz.js');

//función para obtener todos los datos de la luz y las farolas de la ciudad
exports.getLuz = async function (req, res, next) {
    try {
      var luces = await Luz.find({});
      console.log(luces); 
      res.json(luces); 
    } catch (error) {
      console.error(error); 
      next(error); 
    }
};
