const { User } = require('../models');


// a classe contém os métodos responsáveis por manipular e responder às requisições HTTP relacionadas a usuários.
class UserController {


    async getAllUsers(req, res) {
        try {

            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 10;


            const offset = (page - 1) * limit;


            const { count, rows } = await User.findAndCountAll({
                attributes: ['id', 'nome', 'email', 'role'],
                limit: limit,
                offset: offset,
                order: [
                    ['id', 'ASC']
                ]
            });

            res.json({
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                users: rows
            });

        } catch (error) {
            console.error("Erro ao buscar usuários com paginação:", error);
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