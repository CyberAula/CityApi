var express = require('express');
var router = express.Router();

var fotorresistorController = require('../controllers/fotorresistorController.js');

/**
 * @swagger
 * /sensores/{sensor_id}/farolas:
 *   get:
 *     tags:
 *       - Farolas
 *     summary: Devuelve los datos registrados de las farolas.
 *     description: "Ejemplo de uso: /sensores/4/fotorresistores"
 *     responses:
 *       200:
 *         description: Información de las farolas de la ciudad.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Farolas'
 */
router.get('/sensores/:sensor_id/farolas', fotorresistorController.getFotorresistor);

module.exports = router;