var express = require('express');
var router = express.Router();

var temperaturaController = require('../controllers/tempController.js');

/**
 * @swagger
 * /city/temperaturaNorte:
 *   get:
 *     tags:
 *       - Temperatura
 *     summary: Devuelve la temperatura del norte.
 *     description: "Ejemplo de uso: /city/temperaturaNorte"
 *     responses:
 *       200:
 *         description: La temperatura del norte.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TemperaturaNorte'
 */
router.get('/city/temperaturaNorte', temperaturaController.getTemperaturaNorte);

/**
 * @swagger
 * /city/temperaturaSur:
 *   get:
 *     tags:
 *       - Temperatura
 *     summary: Devuelve la temperatura del sur.
 *     description: "Ejemplo de uso: /city/temperaturaSur"
 *     responses:
 *       200:
 *         description: La temperatura del sur.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TemperaturaSur'
 */
router.get('/city/temperaturaSur', temperaturaController.getTemperaturaSur);

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
router.get('/city/temperaturaEste', temperaturaController.getTemperaturaEste);

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
router.get('/city/temperaturaOeste', temperaturaController.getTemperaturaOeste);

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
 *               oneOf:
 *                 - $ref: '#/components/schemas/TemperaturaEste'
 *                 - $ref: '#/components/schemas/TemperaturaOeste'
 */
router.get('/city/temperatura/:index', temperaturaController.getTemperaturaInRange);

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
 *               oneOf:
 *                 - $ref: '#/components/schemas/TemperaturaEste'
 *                 - $ref: '#/components/schemas/TemperaturaOeste'
 */
router.get('/city/temperatura/:index/min', temperaturaController.getTemperaturaMin);

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
 *         description: Indica la zona en la que se mide la temperatura.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: La temperatura máxima en una zona.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/TemperaturaEste'
 *                 - $ref: '#/components/schemas/TemperaturaOeste'
 */
router.get('/city/temperatura/:index/max', temperaturaController.getTemperaturaMax);

module.exports = router;




