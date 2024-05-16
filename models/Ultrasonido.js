//models/Ultrasonido.js
var mongoose = require('mongoose');

const ultrasonidoSchema = new mongoose.Schema({
    sensor_id: Number,
    nombre_sensor: String,
    ultasonic: {
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

module.exports = mongoose.model('Ultrasonido', ultrasonidoSchema);