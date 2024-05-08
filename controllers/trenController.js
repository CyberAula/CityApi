var TrenFrecuencia = require('../models/TrenFrecuencia.js');

exports.getTrenFrecuencias = async function (req, res, next) {
    try {
      var trenfrecuencias = await TrenFrecuencia.find({});
      console.log(trenfrecuencias); 
      res.json(trenfrecuencias); 
    } catch (error) {
      console.error(error); 
      next(error); 
    }
};

exports.getTrenFrecuenciasMayorQue = async function (req, res, next) {
    try {
        let query = {};

        if (req.query.frecMañana) {
            query.frecMañana = { $gt: Number(req.query.frecMañana) };
        }

        if (req.query.frecTarde) {
            query.frecTarde = { $gt: Number(req.query.frecTarde) };
        }

        if (req.query.frecNoche) {
            query.frecNoche = { $gt: Number(req.query.frecNoche) };
        }

        var trenfrecuencias = await TrenFrecuencia.find(query);
        console.log(trenfrecuencias); 
        res.json(trenfrecuencias); 
    } catch (error) {
        console.error(error); 
        next(error); 
    }
};

exports.getTrenFrecuenciasMenorQue = async function (req, res, next) {
    try {
        let query = {};

        if (req.query.frecMañana) {
            query.frecMañana = { $lt: Number(req.query.frecMañana) };
        }

        if (req.query.frecTarde) {
            query.frecTarde = { $lt: Number(req.query.frecTarde) };
        }

        if (req.query.frecNoche) {
            query.frecNoche = { $lt: Number(req.query.frecNoche) };
        }

        var trenfrecuencias = await TrenFrecuencia.find(query);
        console.log(trenfrecuencias); 
        res.json(trenfrecuencias); 
    } catch (error) {
        console.error(error); 
        next(error); 
    }
};