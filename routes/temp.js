var express = require('express');
var router = express.Router();

var temperaturaController = require('../controllers/tempController.js');

/**
 * @swagger
 * /temperatura:
 *   get:
 *     tags:
 *       - Temperatura
 *     summary: Devuelve las temperaturas registradas.
 *     description: "Ejemplo de uso: /temperatura"
 *     responses:
 *       200:
 *         description: La temperatura de la ciudad.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Temperatura'
 */
router.get('/temperatura', temperaturaController.getTemperatura);

/**
 * @swagger
 * /sensores/{sensor_id}?propiedad=temp&min={min}&max={max}:
 *   get:
 *     tags:
 *       - Temperatura
 *     summary: Devuelve la temperatura en un rango especificado.
 *     description: "Ejemplo de uso: /sensores/1?propiedad=temp&min=10&max=20"
 *     parameters:
 *       - in: path
 *         name: sensor_id
 *         required: true
 *         description: ID del sensor.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: propiedad
 *         required: true
 *         description: Propiedad de la temperatura (temp).
 *         schema:
 *           type: string
 *       - in: query
 *         name: min
 *         required: true
 *         description: Valor mínimo del rango.
 *         schema:
 *           type: number
 *       - in: query
 *         name: max
 *         required: true
 *         description: Valor máximo del rango.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: La temperatura en un rango de valores.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Temperatura'
 */
router.get('/sensores/:sensor_id', temperaturaController.getMinAndMaxTemp);

/**
 * @swagger
 * /sensores/{sensor_id}?propiedad=humidity&min={min}&max={max}:
 *   get:
 *     tags:
 *       - Humedad
 *     summary: Devuelve la humedad en un rango especificado.
 *     description: "Ejemplo de uso: /sensores/1?propiedad=humidity&min=10&max=20"
 *     parameters:
 *       - in: path
 *         name: sensor_id
 *         required: true
 *         description: ID del sensor.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: propiedad
 *         required: true
 *         description: Propiedad de la humedad (humidity).
 *         schema:
 *           type: string
 *       - in: query
 *         name: min
 *         required: true
 *         description: Valor mínimo del rango.
 *         schema:
 *           type: number
 *       - in: query
 *         name: max
 *         required: true
 *         description: Valor máximo del rango.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: La humedad en un rango de valores.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Temperatura'
 */
router.get('/sensores/:sensor_id', temperaturaController.getMinAndMaxHumidity);

module.exports = router;