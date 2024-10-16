const { DataTypes } = require('sequelize');
const { connection } = require('@modules/database.module');

const constructor = {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}

const User = connection.define('users', constructor);

User.sync();

User.constructor = constructor;

module.exports = {User};