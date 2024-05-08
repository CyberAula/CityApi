var Viento = require('../models/Viento.js');

//función que obtiene los datos de viento para una dirección específica
exports.getDireccion = async (req, res, next) => {
    try {
        let direccion = req.query.direccion;

        let direccionesValidas = ['Norte', 'Noreste', 'Este', 'Sureste', 'Sur', 'Suroeste', 'Oeste', 'Noroeste'];
        if (!direccionesValidas.includes(direccion)) {
            throw new Error('La dirección proporcionada es inválida');
        }

        var vientos = await Viento.find({ direccion: direccion });

        if (vientos.length === 0) {
            throw new Error('No se encontraron datos de viento para la dirección proporcionada');
        }

        res.json(vientos);
    } catch (error) {
        next(error);
    }
};

//función que obtiene los datos de viento para velocidades entre dos valores
exports.getVientosEntre = async (req, res, next) => {
    try {
        let min = parseFloat(req.query.mayorque);
        let max = parseFloat(req.query.menorque);

        console.log(`Buscando vientos con velocidades entre ${min} y ${max}`);

        var vientos = await Viento.find({
            velocidad: { $gte: min, $lte: max }
        });

        console.log(`Encontrados ${vientos.length} vientos`);
        console.log(vientos);

        res.json(vientos);
    } catch (error) {
        console.error(`Error al buscar vientos: ${error.message}`);
        next(error);
    }
};

//función que obtiene los datos de viento para velocidades mayores que un valor
exports.getVientosMayorQue = async (req, res, next) => {
    try {
        let velocidad = req.query.mayorque;

        var vientos = await Viento.find({ velocidad: { $gt: velocidad } });

        if (vientos.length === 0) {
            throw new Error('No se encontraron datos de viento para la velocidad proporcionada');
        }

        res.json(vientos);
    } catch (error) {
        next(error);
    }
};

//función que obtiene los datos de viento para velocidades menores que un valor
exports.getVientosMenorQue = async (req, res, next) => {
    try {
        let velocidad = req.query.menorque;

        var vientos = await Viento.find({ velocidad: { $lt: velocidad } });

        if (vientos.length === 0) {
            throw new Error('No se encontraron datos de viento para la velocidad proporcionada');
        }

        res.json(vientos);
    } catch (error) {
        next(error);
    }
};