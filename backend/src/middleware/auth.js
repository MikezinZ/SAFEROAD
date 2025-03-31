const jwt = require('jsonwebtoken'); // Importa o módulo jsonwebtoken

const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta'; // Define a chave secreta para assinar os tokens JWT. Em produção, use uma variável de ambiente.


// Middleware de autenticação
// Verifica se o token JWT é válido e adiciona os dados do usuário à requisição
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Autenticação necessária' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = authMiddleware;




