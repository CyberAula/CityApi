var express = require('express');
var router = express.Router();

var traficoController = require('../controllers/traficoController');

/**
 * @swagger
 * /city/traficoCentro:
 *   get:
 *     tags:
 *       - Tráfico
 *     summary: Devuelve el tráfico del centro.
 *     description: "Ejemplo de uso: /city/traficoCentro"
 *     responses:
 *       200:
 *         description: El tráfico del centro.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TraficoCentro'
 */
router.get('/city/traficoCentro', traficoController.getTraficoCentro);

/**
 * @swagger
 * /city/traficoAfueras:
 *   get:
 *     tags:
 *       - Tráfico
 *     summary: Devuelve el tráfico de las afueras.
 *     description: "Ejemplo de uso: /city/traficoAfueras"
 *     responses:
 *       200:
 *         description: El tráfico de las afueras.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TraficoAfueras'
 */
router.get('/city/traficoAfueras', traficoController.getTraficoAfueras);

/**
 * @swagger
 * /city/trafico/{index}?congestion={congestion}:
 *   get:
 *     tags:
 *       - Tráfico
 *     summary: Devuelve el tráfico basado en el parámetro congestión.
 *     description: "Ejemplo de uso: /city/trafico/8?congestion=Alto"
 *     parameters:
 *       - in: path
 *         name: index
 *         schema:
 *           type: integer
 *         required: true
 *         description: El índice del tráfico (8 para centro, 9 para afueras).
 *       - in: query
 *         name: congestion
 *         schema:
 *           type: string
 *           enum: [Bajo, Medio, Alto]
 *         required: true
 *         description: El nivel de congestión para filtrar.
 *     responses:
 *       200:
 *         description: El tráfico basado en el índice y en el nivel de congestión.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/TraficoCentro'
 *                 - $ref: '#/components/schemas/TraficoAfueras'
 */
router.get('/city/trafico/:index', traficoController.getCongestion);

module.exports = router;