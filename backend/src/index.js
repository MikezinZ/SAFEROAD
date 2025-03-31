// importaçãoa de módulos
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const { sequelize } = require('./models');

// Inicialização do express e configuração do servidor
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir requisições de diferentes origens
app.use(cors());
app.use(express.json());

// configuração do swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Management API',
            version: '1.0.0',
            description: 'API for user management and authentication',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas 
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// sincronização do banco de dados e inicialização do servidor
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`🔥 Servidor rodando na porta ${PORT}`);
        console.log(`📄 Documentação do Swagger disponível em http://localhost:${PORT}/api-docs`);
    });
});

module.exports = app;