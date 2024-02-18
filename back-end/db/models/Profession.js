const Sequelize = require('sequelize');
const sequelize = require('../index');

const Profession = sequelize.define('Profession', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Profession;