//models/Fotorresistor.js
var mongoose = require('mongoose');

const fotorresistorSchema = new mongoose.Schema({
    sensor_id: Number,
    nombre_sensor: String,
    luminosity: {
      type: {
        type: String,
        default: "Property"
      },
      value: Number
    },
    fecha: Date
}, { versionKey: false });

module.exports = mongoose.model('Fotorresistore', fotorresistorSchema);