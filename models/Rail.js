//models/Rail.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//esquema de los datos de la frecuencia del tren
const estadoRailSchema = new mongoose.Schema({
  sensor_id: Number,
  nombre_sensor: String,
  commuter: {
    type: {
      type: String,
      default: "Property"
    },
    value: Number
  },
  fecha: Date
}, { versionKey: false });

module.exports = mongoose.model('Raile', estadoRailSchema);