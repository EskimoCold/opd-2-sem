const Sequelize = require('sequelize');
const sequelize = require('../index');

const User = sequelize.define('User', {
    username: {
        type: Sequelize.STRING,
        unique: true,
    },
    password: Sequelize.STRING,
});

module.exports = User;
