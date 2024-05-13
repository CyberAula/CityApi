//models.Alcantarillado.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const alcantarilladoSchema = new mongoose.Schema({
    nombre_sensor: String,
    nivel_agua: Number,
    estado: String,
    fecha: Date
}, { versionKey: false });

module.exports = mongoose.model('Alcantarillado', alcantarilladoSchema);
