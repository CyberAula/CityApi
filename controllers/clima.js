const mongoose = require('mongoose');
const Clima = require('../models/Clima');

exports.obtenerClimaPorFecha = async (req, res, next) => {
    try {
        if (!req.body || !req.body.fecha) {
            console.log('Error: No se proporcionó una fecha.');
            return;
        }

        const { fecha } = req.body;
        const clima = await Clima.findOne({ fecha: fecha });

        if (clima) {
            res.locals.clima = clima;
        } else {
            console.log('Info: No se encontró el clima para la fecha proporcionada.');
        }
    } catch (error) {
        console.log('Error: ' + error.message);
    }

    if (typeof next === 'function') {
        next();
    }
};