var express = require('express');
var router = express.Router();

var sensorController = require('../controllers/sensoresController.js');

router.get('/city/sensores', sensorController.getSensoresData);
router.get('/city/:sensorType/:index', sensorController.getDateData);

module.exports = router;