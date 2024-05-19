var express = require('express');
var router = express.Router();

var ultrasonidoController = require('../controllers/ultrasonidoController.js');

/**
 * @swagger
 * /sensores/{sensor_id}?menorque={menorque}:
 *   get:
 *     tags:
 *       - Ultrasonido
 *     summary: Devuelve los datos del ultrasonido cuya distancia sea menor que la especificada.
 *     description: "Ejemplo de uso: /sensores/3?menorque=100"
 *     parameters:
 *       - name: sensor_id
 *         in: path
 *         description: ID del sensor
 *         required: true
 *         schema:
 *           type: integer
 *       - name: menorque
 *         in: query
 *         description: Valor máximo
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Los datos del ultrasonido que cumplan con lo especificado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ultrasonido'
 */
router.get('/sensores/:sensor_id', ultrasonidoController.getMenorque);

/**
 * @swagger
 * /sensores/{sensor_id}?igualque={igualque}:
 *   get:
 *     tags:
 *       - Ultrasonido
 *     summary: Devuelve los datos del ultrasonido cuya distancia sea igual que la especificada.
 *     description: "Ejemplo de uso: /sensores/3?igualque=100"
 *     parameters:
 *       - name: sensor_id
 *         in: path
 *         description: ID del sensor
 *         required: true
 *         schema:
 *           type: integer
 *       - name: igualque
 *         in: query
 *         description: Valor igual
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Los datos del ultrasonido que cumplan con lo especificado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ultrasonido'
 */
router.get('/sensores/:sensor_id', ultrasonidoController.getIgualque);

/**
 * @swagger
 * /sensores/{sensor_id}?mayorque={mayorque}:
 *   get:
 *     tags:
 *       - Ultrasonido
 *     summary: Devuelve los datos del ultrasonido cuya distancia sea mayor que la especificada.
 *     description: "Ejemplo de uso: /sensores/3?mayorque=100"
 *     parameters:
 *       - name: sensor_id
 *         in: path
 *         description: ID del sensor
 *         required: true
 *         schema:
 *           type: integer
 *       - name: mayorque
 *         in: query
 *         description: Valor mínimo
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Los datos del ultrasonido que cumplan con lo especificado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ultrasonido'
 */
router.get('/sensores/:sensor_id', ultrasonidoController.getMayorque);

module.exports = router;