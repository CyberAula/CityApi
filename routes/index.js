var express = require('express');
var router = express.Router();
const { obtenerClimaPorFecha } = require('../controllers/clima.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LEGO City' });
});

module.exports = router;
