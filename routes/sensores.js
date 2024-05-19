var express = require('express');
var router = express.Router();

var sensoresController = require('../controllers/sensoresController.js');

/**
 * @swagger
 * /sensores:
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
 * /sensores/{numid}:
 *   get:
 *     tags:
 *       - Sensores
 *     summary: Devuelve los datos del sensor con el numid especificado. Si se proporcionan los parámetros 'desde' y 'hasta', filtra los datos del sensor por fecha.
 *     description: >
 *       Este endpoint tiene dos usos principales:
 *       1. Si se hace una solicitud GET sin proporcionar ningún parámetro de consulta, se obtendrá la información del sensor con el numid especificado.
 *       2. Si se hace una solicitud GET proporcionando los parámetros de consulta 'desde' y 'hasta', se obtendrán los datos del sensor con el numid especificado que estén dentro del rango de fechas especificado.
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
 *               $ref: '#/components/schemas/Sensores'
 */
router.get('/sensores/:numid', sensoresController.getSensorData);

module.exports = router;