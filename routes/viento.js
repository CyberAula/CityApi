var express = require('express');
var router = express.Router();

var vientoController = require('../controllers/vientoController.js');

router.get('/city/viento/:index', vientoController.getDireccion);
router.get('/city/viento/:index', vientoController.getVientosEntre);
router.get('/city/viento/:index', vientoController.getVientosMayorQue);
router.get('/city/viento/:index', vientoController.getVientosMenorQue);

module.exports = router;