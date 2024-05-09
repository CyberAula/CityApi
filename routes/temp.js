var express = require('express');
var router = express.Router();

var temperatureController = require('../controllers/tempController.js');

/**
 * @swagger
 * /city/temperaturaEste:
 *   get:
 *     tags:
 *       - Temperatura
 *     summary: Devuelve la temperatura del este.
 *     description: "Ejemplo de uso: /city/temperaturaEste"
 *     responses:
 *       200:
 *         description: La temperatura del este.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TemperaturaEste'
 */
router.get('/city/temperaturaEste', temperatureController.getTemperaturaEste);

/**
 * @swagger
 * /city/temperaturaOeste:
 *   get:
 *     tags:
 *       - Temperatura
 *     summary: Devuelve la temperatura del oeste.
 *     description: "Ejemplo de uso: /city/temperaturaOeste"
 *     responses:
 *       200:
 *         description: La temperatura del oeste.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TemperaturaOeste'
 */
router.get('/city/temperaturaOeste', temperatureController.getTemperaturaOeste);

/**
 * @swagger
 * /city/temperatura/{index}?min={min}&max={max}:
 *   get:
 *     tags:
 *       - Temperatura
 *     summary: Devuelve la temperatura en un rango especificado.
 *     description: "Ejemplo de uso: /city/temperatura/1?min=5&max=12"
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         description: Índice del rango de temperatura.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: La temperatura en el rango especificado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Temperatura'
 */
router.get('/city/temperatura/:index', temperatureController.getTemperaturaInRange);

/**
 * @swagger
 * /city/temperatura/{index}/min:
 *   get:
 *     tags:
 *       - Temperatura
 *     summary: Devuelve la temperatura mínima en una zona.
 *     description: "Ejemplo de uso: /city/temperatura/3/min"
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         description: Indica la zona en la que se mide la temperatura.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: La temperatura mínima en una zona.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Temperatura'
 */
router.get('/city/temperatura/:index/min', temperatureController.getTemperaturaMin);

/**
 * @swagger
 * /city/temperatura/{index}/max:
 *   get:
 *     tags:
 *       - Temperatura
 *     summary: Devuelve la temperatura máxima en una zona.
 *     description: "Ejemplo de uso: /city/temperatura/1/max"
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         description: Indica la zona en la que se mide la temperatura..
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: La temperatura máxima en una zona.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Temperatura'
 */
router.get('/city/temperatura/:index/max', temperatureController.getTemperaturaMax);

module.exports = router;




