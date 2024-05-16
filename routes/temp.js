var express = require('express');
var router = express.Router();

var temperaturaController = require('../controllers/tempController.js');

/**
 * @swagger
 * /city/temperaturaNorte:
 *   get:
 *     tags:
 *       - Temperatura
 *     summary: Devuelve la temperatura del norte.
 *     description: "Ejemplo de uso: /city/temperaturaNorte"
 *     responses:
 *       200:
 *         description: La temperatura del norte.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TemperaturaNorte'
 */
router.get('/temperatura', temperaturaController.getTemperatura);

router.get('/sensores/:sensor_id', temperaturaController.getMinAndMaxTemp);

router.get('/sensores/:sensor_id', temperaturaController.getMinAndMaxHumidity);

module.exports = router;