var express = require('express');
var router = express.Router();

var vientoController = require('../controllers/vientoController.js');

/**
 * @swagger
 * /city/viento/{index}?direccion={direccion}:
 *   get:
 *     tags:
 *       - Viento
 *     summary: Devuelve los datos del viento para una dirección específica.
 *     description: "Ejemplo de uso: '/city/viento/2?direccion=Norte'"
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         description: Número del sensor.
 *         schema:
 *           type: integer
 *           example: 2
 *       - in: query
 *         name: direccion
 *         required: true
 *         description: "Dirección del viento. Posibles valores: \"Norte\", \"Sur\", \"Este\", \"Oeste\", \"Noreste\", \"Noroeste\", \"Sureste\", \"Suroeste\"."
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Los datos del viento recogidos para esa dirección.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Viento'
 */
router.get('/city/viento/:index', vientoController.getDireccion);

/**
 * @swagger
 * /city/viento/{index}?mayorque={mayorque}&menorque={menorque}:
 *   get:
 *     tags:
 *       - Viento
 *     summary: Devuelve los datos del viento para un rango de velocidades.
 *     description: "Ejemplo de uso: '/city/viento/2?mayorque=30&menorque=60'"
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         description: Número del sensor.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: mayorque
 *         required: true
 *         description: Velocidad del viento mayor que este valor.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: menorque
 *         required: true
 *         description: Velocidad del viento menor que este valor.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Los datos del viento recogidos para ese rango de velocidades.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Viento'
 */
router.get('/city/viento/:index', vientoController.getVientosEntre);

/**
 * @swagger
 * /city/viento/{index}?mayorque={mayorque}:
 *   get:
 *     tags:
 *       - Viento
 *     summary: Devuelve los datos del viento para velocidades mayores a la especificada.
 *     description: "Ejemplo de uso: '/city/viento/2?mayorque=30'"
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         description: Número del sensor.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: mayorque
 *         required: true
 *         description: Velocidad del viento mayor que este valor.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Viento'
 */
router.get('/city/viento/:index', vientoController.getVientosMayorQue);

/**
 * @swagger
 * /city/viento/{index}?menorque={menorque}:
 *   get:
 *     tags:
 *       - Viento
 *     summary: Devuelve los datos del viento para velocidades menores a la especificada.
 *     description: "Ejemplo de uso: '/city/viento/2?menorque=60'"
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         description: Número del sensor.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: menorque
 *         required: true
 *         description: Velocidad del viento menor que este valor.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Viento'
 */
router.get('/city/viento/:index', vientoController.getVientosMenorQue); 

module.exports = router;