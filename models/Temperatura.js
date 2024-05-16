// models/Temperatura.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//esquema de los datos de la temperatura
const temperaturaSchema = new mongoose.Schema({ 
  sensor_id: Number,
  nombre_sensor: String,
  temp: {
    type: {
      type: String,
      default: "Property"
    },
    value: Number
  },
  humidity: {
    type: {
      type: String,
      default: "Property"
    },
    value: Number
  },
  fecha: Date
}, {
  versionKey: false
});
  
module.exports = mongoose.model('Temperatura', temperaturaSchema);