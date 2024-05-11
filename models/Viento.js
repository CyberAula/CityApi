//models/Viento.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//esquema de los datos de viento
const VientoSchema = new mongoose.Schema({
  nombre_sensor: String,
  velocidad: Number,
  direccion: String,
  fecha: Date
}, { versionKey: false });
  
  module.exports = mongoose.model('Viento', VientoSchema);