
const Temperatura = require('../models/Temperatura');
const Ultrasonido = require('../models/Ultrasonido');
const Fotorresistor = require('../models/Fotorresistor');
const createError = require('http-errors');

exports.filterByOrden = async function(sensor_id, orden) {
    let order = orden === 'ascendente' ? 1 : -1;

    switch (sensor_id) {
        case '1':
            return await Temperatura.find().sort({ 'temp.value': order });
        case '2':
            throw createError(400, 'Este sensor no responde al orden');
        case '3':
            return await Ultrasonido.find().sort({ 'ultasonic.value': order });
        case '4':
            return await Fotorresistor.find().sort({ 'luminosity.value': order });
        default:
            throw createError(404, 'Sensor no encontrado');
    }
}