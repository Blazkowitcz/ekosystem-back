const { DataTypes } = require('sequelize');
const { connection } = require('@modules/database.module');
const { System } = require('@models/system.model');

const constructor = {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    port: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    systemId: {
        type: DataTypes.STRING,
        reference: {
            model: System,
            key: 'id'
        }
    }
}

const Process = connection.define('processes', constructor);

Process.belongsTo(System, { foreignKey: 'systemId', as: 'system'});
System.hasMany(Process);

System.addScope('processes', {include: {model: Process, as: 'processes'}});

Process.sync({alter: true});

Process.constructor = constructor;

module.exports = {Process};