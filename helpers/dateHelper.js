const moment = require('moment');
const Temperatura = require('../models/Temperatura');
const Rail = require('../models/Rail');
const Ultrasonido = require('../models/Ultrasonido');
const Fotorresistor = require('../models/Fotorresistor');
const createError = require('http-errors');

exports.filterByDate = async function(numid, desde, hasta) {
    let fromDate = moment(desde);
    let toDate = moment(hasta);

    // Validar las fechas
    if (!fromDate.isValid() || !toDate.isValid()) {
        throw new Error('Las fechas proporcionadas son inválidas');
    }

    fromDate = fromDate.toDate();
    toDate = toDate.toDate();

    switch (numid) {
        case '1':
            return await Temperatura.find({ fecha: { $gte: fromDate, $lte: toDate } });
        case '2':
            return await Rail.find({ fecha: { $gte: fromDate, $lte: toDate } });
        case '3':
            return await Ultrasonido.find({ fecha: { $gte: fromDate, $lte: toDate } });
        case '4':
            return await Fotorresistor.find({ fecha: { $gte: fromDate, $lte: toDate } });
        default:
            throw createError(404, 'Sensor no encontrado');
    }
}

