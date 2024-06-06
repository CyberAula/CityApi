var Fotorresistor = require('../models/Fotorresistor.js');

//función para obtener todos los datos de los trenes
exports.getFotorresistor = async function (req, res, next) {
    try {
      var fotorresistores = await Fotorresistor.find({});
      console.log(fotorresistores); 
      res.json(fotorresistores); 
    } catch (error) {
      console.error(error); 
      next(error); 
    }
};