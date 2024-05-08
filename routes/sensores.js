var express = require('express');
var router = express.Router();

var sensoresController = require('../controllers/sensoresController.js');

router.get('/city/sensores', sensoresController.getSensoresData);
router.get('/city/:sensorType/:index', sensoresController.getDateData);

module.exports = router;