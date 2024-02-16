const Sequelize = require('sequelize');
const sequelize = require('../index');

const Quality = sequelize.define('Quality', {
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

module.exports = Quality;