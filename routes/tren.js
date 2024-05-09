var express = require('express');
var router = express.Router();

var trenController = require('../controllers/trenController.js');

/**
 * @swagger
 * /city/trenfrecuencia:
 *   get:
 *     tags:
 *       - Frecuencia del tren
 *     summary: Devuelve los datos de la frecuencia del tren.
 *     description: "Ejemplo de uso: /city/trenfrecuencia"
 *     responses:
 *       200:
 *         description: Los datos de la frecuencia del tren.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrenFrecuencia'
 */
router.get('/city/trenfrecuencia', trenController.getTrenFrecuencias);

/**
 * @swagger
 * /city/trenfrecuencia/{index}/mayorque?:
 *   get:
 *     tags:
 *       - Frecuencia del tren
 *     summary: Devuelve los datos de la frecuencia del tren que son mayores que un valor especificado.
 *     description: "Ejemplo de uso: /city/trenfrecuencia/4/mayorque?frecMañana=10"
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         description: Índice del tren.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Los datos de la frecuencia del tren que son mayores que el valor especificado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrenFrecuencia'
 */
router.get('/city/trenfrecuencia/:index/mayorque', trenController.getTrenFrecuenciasMayorQue);

/**
 * @swagger
 * /city/trenfrecuencia/{index}/menorque?:
 *   get:
 *     tags:
 *       - Frecuencia del tren
 *     summary: Devuelve los datos de la frecuencia del tren que son menores que un valor especificado.
 *     description: "Ejemplo de uso: /city/trenfrecuencia/4/menorque?frecTarde=5"
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         description: Índice del tren.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Los datos de la frecuencia del tren que son menores que el valor especificado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrenFrecuencia'
 */
router.get('/city/trenfrecuencia/:index/menorque', trenController.getTrenFrecuenciasMenorQue);

module.exports = router;