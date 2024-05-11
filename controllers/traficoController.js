var TraficoCentro = require('../models/TraficoCentro'); // Importa el modelo de datos de tráfico
var TraficoAfueras = require('../models/TraficoAfueras')

//función que devuelve el tráfico en el centro
exports.getTraficoCentro = async function(req, res, next) {
    try {
        const traficocentros = await TraficoCentro.find({});
        res.json(traficocentros);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

//función que devuelve el tráfico en las afueras
exports.getTraficoAfueras = async function(req, res, next) {
    try {
        const traficoafueras = await TraficoAfueras.find({});
        res.json(traficoafueras);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

//función que obtiene los datos de viento para una dirección específica
exports.getCongestion = async (req, res, next) => {
    try {
        let congestion = req.query.congestion;
        let index = req.params.index;

        let congestionesValidas = ['Bajo', 'Medio', 'Alto'];
        if (!congestionesValidas.includes(congestion)) {
            throw new Error('El nivel de congestión proporcionado es invalido');
        }

        let Model;
        if (index === '8') {
          Model = TraficoCentro;
        } else if (index === '9') {
          Model = TraficoAfueras;
        } else {
          throw new Error('La dirección proporcionada es inválida');
        }
        var traficos = await Model.find({ nivel_congestion: congestion });

        if (traficos.length === 0) {
            throw new Error('No se encontraron datos de viento para la dirección proporcionada');
        }

        res.json(traficos);
    } catch (error) {
        next(error);
    }
};
