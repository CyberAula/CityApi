var express = require('express');
var router = express.Router();

var sensoresController = require('../controllers/sensoresController.js');

/**
 * @swagger
 * /city/sensores:
 *   get:
 *     tags:
 *       - Sensores
 *     summary: Devuelve los datos de todos los sensores.
 *     responses:
 *       200:
 *         description: Los datos de todos los sensores.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensores'
 */
router.get('/city/sensores', sensoresController.getSensoresData);

/**
 * @swagger
 * /city/{sensorType}/{index}:
 *   get:
 *     tags:
 *       - Sensores
 *     summary: Devuelve los datos de un tipo específico de sensor.
 *     parameters:
 *       - in: path
 *         name: sensorType
 *         required: true
 *         description: Tipo de sensor.
 *         schema:
 *           type: string
 *       - in: path
 *         name: index
 *         required: true
 *         description: Índice del sensor.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Los datos del sensor especificado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensores'
 */
router.get('/city/:sensorType/:index', sensoresController.getDateData);

module.exports = router;