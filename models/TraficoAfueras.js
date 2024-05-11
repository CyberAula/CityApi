//models.TraficoAfueras.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const traficoSchema = new mongoose.Schema({
    nombre_sensor: String,
    vehículos: Number,
    velocidad_media: Number,
    nivel_congestion: String,
    hora_punta: [String],
    fecha: Date
  }, { versionKey: false });

module.exports = mongoose.model('TraficoAfuera', traficoSchema);