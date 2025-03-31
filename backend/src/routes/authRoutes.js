const express = require('express');
const authController = require('../controllers/authController');
const { body } = require('express-validator');

const router = express.Router();

// Define as rotas da API de autenticação
/**
 *  @swagger
 * /api/auth/login:
 *   post:                  
 *    summary: Login do usuário
 *   tags: [Auth]
 *   requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *         type: object
 *          properties:
 *           email:
 *            type: string
 *           senha:
 *           type: string
 *  
 *  responses:
 *      200:
 *       description: Login bem sucedido
 */

router.post('/login',
    [
        body('email').isEmail(),
        body('senha').exists()
    ],
    authController.login
);

/**
 * @swagger
 * /api/auth/register:
 *    post:
 *     summary: Registrar novo usuário
 *      tags: [Auth]
 *      requestBody:
 *       required: true
 *      content:
 *       application/json:
 *       schema:
 *        type: object
 *       properties:
 *        nome:
 *        type: string
 *       email:
 *        type: string
 *       senha:
 *        type: string
 *    responses:
 *      201:
 *        description: Usuário registrado com sucesso
 */
/// Define a rota para registrar um novo usuário
router.post('/register',
    [
        body('nome').noEmpty(),
        body('email').isEmail(),
        body('senha').isLength({ min: 6 })
    ],
    authController.register
);

module.exports = router;