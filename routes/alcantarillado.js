var express = require('express');
var router = express.Router();

var alcantarilladoController = require('../controllers/alcantarilladoController');

/**
 * @swagger
 * /city/alcantarillado:
 *   get:
 *     tags:
 *       - Agua
 *     summary: Devuelve los datos del alcantarillado.
 *     description: "Ejemplo de uso: /city/alcantarillado"
 *     responses:
 *       200:
 *         description: Los datos del alcantarillado, medida del agua y estado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alcantarillado'
 */
router.get('/city/alcantarillado', alcantarilladoController.getAlcantarillado);

/**
 * @swagger
 * /city/alcantarillado/{index}?estado={estado}:
 *   get:
 *     tags:
 *       - Agua
 *     summary: Devuelve los datos del alcantarillado.
 *     description: "Ejemplo de uso: /city/alcantarillado/11?estado=Lleno"
 *     responses:
 *       200:
 *         description: Los datos del alcantarillado, medida del agua y estado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alcantarillado'
 */
router.get('/city/alcantarillado/:index', alcantarilladoController.getNivelAgua);

module.exports = router;