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
    },
    password: Sequelize.STRING,
    is_expert: Sequelize.BOOLEAN
});

module.exports = User;
