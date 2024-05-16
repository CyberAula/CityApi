var ultrasonidoSchema = require('../models/Ultrasonido.js');

// Función para filtrar por mayor que
exports.getMayorque = async function (mayorque) {
    return ultrasonidoSchema.find({ "ultasonic.value": { $gt: mayorque } });
}

// Función para filtrar por menor que
exports.getMenorque = async function (menorque) {
    return ultrasonidoSchema.find({ "ultasonic.value": { $lt: menorque } });
}

// Función para filtrar por igual que
exports.getIgualque = async function (igualque) {
    return ultrasonidoSchema.find({ "ultasonic.value": igualque });
}