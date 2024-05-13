var Alcantarillado = require('../models/Alcantarillado.js');

//función para obtener todos los datos del alcantarillado
exports.getAlcantarillado = async function (req, res, next) {
    try {
      var alcantarillados = await Alcantarillado.find({});
      console.log(alcantarillados); 
      res.json(alcantarillados); 
    } catch (error) {
      console.error(error); 
      next(error); 
    }
};

exports.getNivelAgua = async function (req, res, next) {
  try {
    const estado = req.query.estado;
    const alcantarillado = await Alcantarillado.find({ estado: estado });
    res.json(alcantarillado);
  } catch (err) {
    next(err);
  }
}
