// models/TemperaturaEste.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//esquema de los datos de la temperatura
const temperatureSchema = new mongoose.Schema({ 
    sensor_name: String,
    temperature: Number,
    humidity: Number,
    date: Date
    }, {
       versionKey: false
  });
  
module.exports = mongoose.model('TemperaturaEste', temperatureSchema);