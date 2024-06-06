var express = require('express');
var router = express.Router();

router.get('/continuo/sensores/:numid', (req, res) => {
  const numid = req.params.numid;
  // Pasar numid a la plantilla para usarlo en el script del cliente
  res.render('continuo', { numid });
});

module.exports = router;