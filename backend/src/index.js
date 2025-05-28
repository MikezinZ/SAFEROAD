require('dotenv').config();

// importaçãoa de módulos
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const { sequelize } = require('./models');

// Inicialização do express e configuração do servidor
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir requisições de diferentes origens
// const frontendURL = "https://saferoad-lime.vercel.app"
// app.use(cors({ origin: frontendURL }));
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
    console.error("ERRO GLOBAL", err.stack);
    res.status(500).json({ message: 'Algo deu errado no servidor.', error: err.message });
});

// enedpoint de saúde
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Backend SAFEROAD está saudável!' });
});

// sincronização do banco de dados e inicialização do servidor
sequelize.sync()
    .then(() => {
        console.log('Sincronização com o banco de dados (RDS) bem-sucedida.');
        if (process.env.NODE_ENV !== 'production_lambda') {
            app.listen(PORT, () => {
                console.log(`🔥 Servidor LOCAL rodando na porta ${PORT}`);
                console.log(`📄 Documentação LOCAL: http://localhost:${PORT}/api-docs`);
            });
        }
    })
    .catch(err => {
        console.error('Falha ao sincronizar com o banco de dados:', err);

        if (process.env.NODE_ENV === 'production_lambda') {
            throw err;
        }
    });

module.exports.handler = serverless(app); 