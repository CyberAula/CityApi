//models.Residuos.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const residuoSchema = new mongoose.Schema({
    nombre_sensor: String,
    contenedores: [{
      zona: String,
      hora_llenado: String,
      hora_recogida: String,
    }],
    fecha: Date
}, { versionKey: false });

module.exports = mongoose.model('Residuo', residuoSchema);