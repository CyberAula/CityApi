var express = require('express');
var router = express.Router();

var ultrasonidoController = require('../controllers/ultrasonidoController.js');

router.get('/sensores/:sensor_id', ultrasonidoController.getMayorque);
router.get('/sensores/:sensor_id', ultrasonidoController.getMenorque);
router.get('/sensores/:sensor_id', ultrasonidoController.getIgualque);

module.exports = router;