var express = require('express');
var router = express.Router();

var temperaturaController = require('../controllers/tempController.js');

/**
 * @swagger
 * /sensores/{sensor_id}/temp&humd:
 *   get:
 *     tags:
 *       - Temperatura
 *     summary: Devuelve las temperaturas registradas.
 *     description: "Ejemplo de uso: /sensores/1/temp&humd"
 *     responses:
 *       200:
 *         description: La temperatura de la ciudad.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Temperatura'
 */
router.get('/sensores/1/temperatura', temperaturaController.getTemperatura);

module.exports = router;