var express = require('express');
var router = express.Router();

var trenController = require('../controllers/trenController.js');

router.get('/city/trenfrecuencia', trenController.getTrenFrecuencias);
router.get('/city/trenfrecuencia/:index/mayorque', trenController.getTrenFrecuenciasMayorQue);
router.get('/city/trenfrecuencia/:index/menorque', trenController.getTrenFrecuenciasMenorQue);

module.exports = router;