var express = require('express');
var router = express.Router();

var railController = require('../controllers/railController.js');

router.get('/sensores/:sensor_id', railController.getEstadoRail);

module.exports = router;