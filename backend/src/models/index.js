
// importação do módulo 'sequelize' do arquivo de configuração do banco de dados.
const sequelize = require('../config/database');
const User = require('./user');

// Importação do modelo de usuário.
module.exports = {
    sequelize,
    User
};