const { User } = require('../models');


// a classe contém os métodos responsáveis por manipular e responder às requisições HTTP relacionadas a usuários.
class UserController {

    // Retorna todos os usuários da base de dados.
    async getAllUsers(req, res) { // 
        try {
            const users = await User.findAll({
                attributes: ['id', 'nome', 'email']
            });
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    //  Recupera um usuário específico pelo ID.
    async getUserById(req, res) {
        try {
            const user = await User.findByPk(req.params.id, {
                attributes: ['id', 'nome', 'email']
            });
            if (!user) {
                return res.status(404).json({ message: 'Usuario não encontrado' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Cria um novo usuário
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(201).json({
                id: user.id,
                nome: user.nome,
                email: user.email
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


    // Atualiza os dados de um usuário específico.
    async updateUser(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario não encontrado' });
            }
            await user.update(req.body);
            res.json({
                id: user.id,
                nome: user.nome,
                email: user.email
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    //Deleta um usuário específico.
    async deleteUser(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuario não encontrado' });
            }
            await user.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UserController();