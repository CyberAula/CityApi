var express = require('express');
var router = express.Router();

var vientoController = require('../controllers/vientoController.js');

router.get('/city/viento/:index', vientoController.getWindDataByDirection);

module.exports = router;