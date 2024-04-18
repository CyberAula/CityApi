
const mongoose = require('mongoose');
const Clima = require('../models/Clima');

exports.obtenerClimaPorFecha = async (req, res, next) => {
    try {
        const {fecha} = req.body;
        const clima = await Clima.findOne({where: {fecha: fecha}});
        if (clima) {
            res.locals.clima = clima;
        } else {
            console.log('Info: No se encontró el clima para la fecha proporcionada.');
        }
    } catch (error) {
        console.log('Error: ' + error.message);
    }

    next();
};