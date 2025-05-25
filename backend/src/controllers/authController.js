const jwt = require("jsonwebtoken");
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || "sua-chave-secreta"; // Substitua pela sua chave secreta real


// Controller de autenticação
// Este controller gerencia o login e o registro de usuários
class AuthController {
    async login(req, res) {
        // Método para autenticar um usuário    
        try {
            const { email, senha } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: "Credenciais inválidas" });
            }

            const isValidPassword = await user.validatePassword(senha);
            if (!isValidPassword) {
                return res.status(401).json({ message: "Credenciais inválidas" });
            }
            const token = jwt.sign(
                { id: user.id, email: user.email },
                JWT_SECRET,
                { expiresIn: "24h" }
            );

            res.json({
                token,
                user: {
                    id: user.id,
                    nome: user.nome, // Note que o campo é 'nome'
                    email: user.email
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Método para registrar um novo usuário
    async register(req, res) {
        try {
            const user = await User.create(req.body);
            const token = jwt.sign(
                { id: user.id, email: user.email },
                JWT_SECRET,
                { expiresIn: "24h" }
            );

            res.status(201).json({
                token,
                user: {
                    id: user.id,
                    username: user.nome,
                    email: user.email
                }
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();