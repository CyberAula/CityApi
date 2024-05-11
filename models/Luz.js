//models.Luz.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//esquema de datos para la luz
const luzSchema = new mongoose.Schema({
    nombre_sensor: String,
    hora_amanecer: String,
    hora_anochecer: String,
    farolas: [{
      zona: String,
      hora_encendido: String,
      hora_apagado: String,
    }],
    fecha: Date
  }, { versionKey: false });

module.exports = mongoose.model('Luce', luzSchema);

