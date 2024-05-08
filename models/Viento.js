//models/Viento.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//esquema de los datos de viento
const VientoSchema = new mongoose.Schema({
    sensor_name: String,
    velocidad: Number,
    direccion: String,
    date: Date
  }, { versionKey: false });
  
  module.exports = mongoose.model('Viento', VientoSchema);