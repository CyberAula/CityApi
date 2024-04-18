'use strict';

const mongoose = require('mongoose');

const ClimaSchema = new mongoose.Schema({
    temperatura: {
        type: Number,
        required: [true, 'Debe estar completo']
    },
    humedad: {
        type: Number,
        required: [true, 'Debe estar completo']
    },
    fecha: {
        type: Date,
        required: [true, 'Debe estar completo']
    }
});

module.exports = mongoose.model('Clima', ClimaSchema);