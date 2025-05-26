// importação do sequelize e bcryptjs
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

// Define um modelo de usuário com os campos id, nome, email e senha
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
    }

},
    // o bloco de baixo é um hook do sequelize que executa antes de criar um usuário
    {
        hooks: {
            beforeCreate: async (user) => {
                if (user.senha) {
                    const salt = await bcrypt.genSalt(10);
                    user.senha = await bcrypt.hash(user.senha, salt);
                }
            }
        }

    }
);

// Define um método para verificar se a senha fornecida corresponde à senha armazenada no banco de dados
// O método usa bcrypt para comparar a senha fornecida com a senha armazenada
User.prototype.validatePassword = async function (senha) {
    return await bcrypt.compare(senha, this.senha);
}

module.exports = User;