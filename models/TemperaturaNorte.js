// models/TemperaturaNorte.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//esquema de los datos de la temperatura
const temperaturaSchema = new mongoose.Schema({ 
  nombre_sensor: String,
  temperatura: Number,
  humedad: Number,
  fecha: Date
  }, {
     versionKey: false
});
  
module.exports = mongoose.model('TemperaturaNorte', temperaturaSchema);