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
 *     summary: Tres posibles usos, ver descripción.
 *     description: >
 *       Este endpoint tiene tres usos principales:
 *       1. Si se hace una solicitud GET sin proporcionar ningún parámetro de consulta, se obtendrá la información del sensor con el numid especificado.
 *       2. Si se hace una solicitud GET proporcionando los parámetros de consulta 'desde' y 'hasta', se obtendrán los datos del sensor con el numid especificado que estén dentro del rango de fechas especificado.
 *       3. Si se hace una solicitud GET proporcionando el parámetro de consulta 'orden', se obtendrán los datos del sensor con el numid especificado ordenados según el criterio especificado. Ordena los datos recopilados de la temperatura(1), el ultrasonido(3) y la luminosidad(4).
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
 *       - in: query
 *         name: orden
 *         schema:
 *           type: string
 *         description: El criterio de ordenación de los datos del sensor. Puede ser 'ascendente' para orden ascendente o 'descendente' para orden descendente.
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