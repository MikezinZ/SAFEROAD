const express = require('express');
const userController = require('../controllers/userController');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router(); // Cria uma instância do roteador


// Define as rotas da API de usuários
/**

 * /api/users:
 *   get:
 *     summary: Obter todos os usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 */

router.get('/', authMiddleware, userController.getAllUsers);


/**

 * /api/users/{id}:
 *   get:
 *   summary: Obter usuário por ID
 *   tags: [Users]
 *   security:
 *    - bearerAuth: []
 *  parameters:
 *    - in: path
 *     name: id
 *     required: true
 *     schema:
 *      type: integer
 *  responses:
 *     200:
 *      description: Detalhes do usuário
 */
router.get('/:id', authMiddleware, userController.getUserById);

/**
 * /api/users:
 *  post:
 *    summary: Criar um novo usuário
 *    tags: [Users]
 *    security:
 *     - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *                nome:
 *                  type: string
 *                email:
 *                  type: string
 *                senha:
 *                  type: string
 *     responses:
 *         201:
 *           description: Usuário criado com sucesso
 */
// Define a rota para criar um novo usuário
// O middleware de autenticação é aplicado a esta rota
router.post('/',
    authMiddleware,
    [
        body('nome').notEmpty().withMessage('O campo nome é obrigatório.'),
        body('email').isEmail().withMessage('Forneça um email válido.'),
        body('senha').isLength({ min: 6 }).withMessage('A senha precisa ter no mínimo 6 caracteres.')
    ],
    (req, res, next) => { // Adicione esta função intermediária
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    userController.createUser
);

/**

 * /api/users/{id}:
 *   put:
 *     summary: Atualizar usuário por ID
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *         properties:
 *          nome:
 *           type: string
 *          email:
 *           type: string
 *    responses:
 *      200:
 * *       description: Usuário atualizado com sucesso
 */
router.put('/:id', authMiddleware, userController.updateUser);

/**

 * /api/users/{id}:
 *   delete:
 *     summary: Deletar usuário por ID
 *     tags: [Users]
 *     security:
 *        - bearerAuth: []
 *    parameters:
 *     - in: path
 *       name: id
 *      required: true
 *      schema:
 *       type: integer
 *    responses:
 *     204:
 *     description: Usuário deletado com sucesso
 */
router.delete('/:id', authMiddleware, authorize(['admin']), userController.deleteUser);

module.exports = router;


