var Residuos = require('../models/Residuos');

//función para obtener la información de los residuos de la ciudad por zonas
exports.getResiduos = async function (req, res, next) {
    try {
      var residuos = await Residuos.find({});
      console.log(residuos); 
      res.json(residuos); 
    } catch (error) {
      console.error(error); 
      next(error); 
    }
};