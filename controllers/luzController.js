var Luz = require('../models/Luz.js');

//función para obtener todos los datos de los trenes
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
