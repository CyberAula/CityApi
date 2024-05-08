var express = require('express');
var router = express.Router();

var temperatureController = require('../controllers/tempController.js');

router.get('/city/temperaturaEste', temperatureController.getTemperaturaEste);
router.get('/city/temperaturaOeste', temperatureController.getTemperaturaOeste);

module.exports = router;




