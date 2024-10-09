const { Sequelize } = require('sequelize');

const connection = new Sequelize('', '', '', {
    host: '',
    dialect: ''
});

connection.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = { connection }