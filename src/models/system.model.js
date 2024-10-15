const { DataTypes } = require('sequelize');
const { connection } = require('@modules/database.module');

const constructor = {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    port: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    os: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sensorKey: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}

const System = connection.define('systems', constructor);

System.sync();

System.constructor = constructor;

module.exports = {System};