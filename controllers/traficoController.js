var TraficoCentro = require('../models/TraficoCentro'); // Importa el modelo de datos de tráfico
var TraficoAfueras = require('../models/TraficoAfueras')

// Function to get traffic data for the city center
exports.getTraficoCentro = async function(req, res, next) {
    try {
        const traficocentros = await TraficoCentro.find({});
        res.json(traficocentros);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// Function to get traffic data for the outskirts of the city
exports.getTraficoAfueras = async function(req, res, next) {
    try {
        const traficoafueras = await TraficoAfueras.find({});
        res.json(traficoafueras);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
