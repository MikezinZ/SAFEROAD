require('dotenv').config();
const { Sequelize } = require('sequelize');

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
    const errorMessage = "ERRO CRÍTICO: DATABASE_URL não está definida nas variáveis de ambiente! O servidor não pode iniciar sem ela.";
    console.error(errorMessage);
    throw new Error(errorMessage);
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

module.exports = sequelize;