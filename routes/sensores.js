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
router.get('/sensores', sensoresController.getSensoresData);

/**
 * @swagger
 * /city/sensores/{numid}:
 *   get:
 *     tags:
 *       - Sensores
 *     summary: Devuelve los datos del sensor con el numid especificado.
 *     parameters:
 *       - in: path
 *         name: numid
 *         required: true
 *         schema:
 *           type: integer
 *         description: El numid del sensor.
 *       - in: query
 *         name: desde
 *         schema:
 *           type: string
 *           format: date-time
 *         description: La fecha de inicio para filtrar los datos del sensor.
 *       - in: query
 *         name: hasta
 *         schema:
 *           type: string
 *           format: date-time
 *         description: La fecha de fin para filtrar los datos del sensor.
 *     responses:
 *       200:
 *         description: Los datos del sensor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensor'
 */
router.get('/sensores/:numid', sensoresController.getSensorData);

module.exports = router;