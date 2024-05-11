var express = require('express');
var router = express.Router();

var luzController = require('../controllers/luzController.js');

/**
 * @swagger
 * /city/luces:
 *   get:
 *     tags:
 *       - Luz
 *     summary: Devuelve los datos de la luz y las farolas.
 *     description: "Ejemplo de uso: /city/luces"
 *     responses:
 *       200:
 *         description: Los datos de la luz y de las farolas según la zona.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Luz'
 */
router.get('/city/luces', luzController.getLuz);

module.exports = router;