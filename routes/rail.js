var express = require('express');
var router = express.Router();

var railController = require('../controllers/railController.js');

/**
 * @swagger
 * /sensores/{sensor_id}/railes:
 *   get:
 *     tags:
 *       - Raíl
 *     summary: Devuelve los datos registrados del conmutador del raíl.
 *     description: "Ejemplo de uso: /sensores/2/railes"
 *     responses:
 *       200:
 *         description: Información del conmutador y el servomotor de la ciudad.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Raíl'
 */
router.get('/sensores/:sensor_id/railes', railController.getRailes);

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
router.get('/sensores/:sensor_id', railController.getEstadoRail);

module.exports = router;