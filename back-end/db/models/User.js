const Sequelize = require('sequelize');
const sequelize = require('../index');

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    password: Sequelize.STRING,
    isExpert: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = User;
