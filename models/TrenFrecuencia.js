//models/TrenFrecuencia.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//esquema de los datos de la frecuencia del tren
const trenFrecuenciaSchema = new mongoose.Schema({
    nombre_sensor: String,
    frecMañana: Number,
    frecTarde: Number,
    frecNoche: Number,
    fecha: Date
}, { versionKey: false });

module.exports = mongoose.model('TrenFrecuencia', trenFrecuenciaSchema);