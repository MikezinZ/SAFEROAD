require('dotenv').config();

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
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/routes/*.js'], // Caminho para os arquivos com as anotações Swagger
};

// Middleware para tratar erros do Swagger
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: "Bad request - invalid JSON" });
    }
    next();
});

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas 
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// tratamento de erro global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

// enedpoint de saúde
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// sincronização do banco de dados e inicialização do servidor
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🔥 Servidor rodando na porta ${PORT}`);
            console.log(`📄 Documentação: http://localhost:${PORT}/api-docs`);
        });
    })
    .catch(err => {
        console.error('Falha ao sincronizar com o banco de dados:', err);
    });

module.exports = app; 