var express = require('express');
var router = express.Router();

var residuosController = require('../controllers/residuosController');

/**
 * @swagger
 * /city/residuos:
 *   get:
 *     tags:
 *       - Residuos
 *     summary: Devuelve la información de los residuos.
 *     description: "Ejemplo de uso: /city/residuos"
 *     responses:
 *       200:
 *         description: La temperatura del norte.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Residuos'
 */
router.get('/city/residuos', residuosController.getResiduos);

module.exports = router;