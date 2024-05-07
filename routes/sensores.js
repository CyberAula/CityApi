var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var createError = require('http-errors');

//ruta al archivo sensores.json
var sensoresFilePath = path.join(__dirname, '../DataCollection', 'sensores.json');

router.get('/city/sensores', function(req, res, next) {
  fs.readFile(sensoresFilePath, 'utf8', function(err, data) {
    if (err) {
      return next(err);
    }
    try {
      var sensoresData = JSON.parse(data);
      res.json(sensoresData);
    } catch (parseError) {
        return next(parseError);
    }
  });
});

module.exports = router;