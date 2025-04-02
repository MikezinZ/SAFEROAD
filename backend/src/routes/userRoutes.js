const express = require('express');
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth');

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
    [
        body('nome').notEmpty(),
        body('email').isEmail(),
        body('senha').isLength({ min: 6 })
    ],
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
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;


