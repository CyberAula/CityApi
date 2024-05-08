// vientoController.js
var Viento = require('../models/Viento.js');

exports.getWindDataByDirection = async (req, res, next) => {
    try {
        let direccion = req.query.direccion;

        let direccionesValidas = ['Norte', 'Noreste', 'Este', 'Sureste', 'Sur', 'Suroeste', 'Oeste', 'Noroeste'];
        if (!direccionesValidas.includes(direccion)) {
            throw new Error('La dirección proporcionada es inválida');
        }

        var vientos = await Viento.find({direccion: direccion});

        if (vientos.length === 0) {
            throw new Error('No se encontraron datos de viento para la dirección proporcionada');
        }

        res.json(vientos); 
    } catch (error) {
        next(error); 
    }
};