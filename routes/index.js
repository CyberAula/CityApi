var express = require('express');
var router = express.Router();
const { obtenerClimaPorFecha } = require('../controllers/clima.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LEGO City' });
});

//Renderiza la vista clima.ejs
router.get('/clima', function(req, res, next) {
  res.render('clima', {title: 'Clima'}); 
});

router.post('/clima', async (req, res) => {
  try {
      const {fecha } = req.body;
      const clima = await obtenerClimaPorFecha(fecha);
      res.render('clima', { clima });
  } catch (error) {
      res.status(500).send(error.message);
  }
});

module.exports = router;
