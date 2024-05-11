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

module.exports = router;