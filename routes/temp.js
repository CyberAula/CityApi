var express = require('express');
var router = express.Router();

var temperatureController = require('../controllers/tempController.js');

router.get('/city/temperaturaEste', temperatureController.getTemperaturaEste);
router.get('/city/temperaturaOeste', temperatureController.getTemperaturaOeste);
router.get('/city/temperatura/:index', temperatureController.getTemperaturaInRange);
router.get('/city/temperatura/:index/min', temperatureController.getTemperaturaMin);
router.get('/city/temperatura/:index/max', temperatureController.getTemperaturaMax);


module.exports = router;




