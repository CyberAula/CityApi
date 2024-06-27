var express = require('express');
var router = express.Router();

var InfrarrojosController = require('../controllers/InfrarrojosController.js');

/**
 * @swagger
 * /sensores/{sensor_id}/Infrarrojoses:
 *   get:
 *     tags:
 *       - Raíl
 *     summary: Devuelve los datos registrados del conmutador del raíl.
 *     description: "Ejemplo de uso: /sensores/2/Infrarrojoses"
 *     responses:
 *       200:
 *         description: Información del conmutador y el servomotor de la ciudad.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Raíl'
 */
router.get('/sensores/:sensor_id/Infrarrojoses', InfrarrojosController.getInfrarrojoses);

/**
 * @swagger
 * /sensores/{sensor_id}?estado={estado}:
 *   get:
 *     tags:
 *       - Raíl
 *     summary: Devuelve los datos del conmutador y servomotor según el estado especificado.
 *     description: "Ejemplo de uso: /sensores/2?estado=1"
 *     parameters:
 *       - in: path
 *         name: sensor_id
 *         required: true
 *         description: ID del sensor
 *         schema:
 *           type: integer
 *       - in: query
 *         name: estado
 *         required: true
 *         description: Estado especificado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del conmutador y servomotor según el estado especificado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Raíl'
 */
router.get('/sensores/:sensor_id', InfrarrojosController.getEstadoInfrarrojos);

module.exports = router;