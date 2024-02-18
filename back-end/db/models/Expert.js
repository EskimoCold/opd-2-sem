const Sequelize = require('sequelize');
const sequelize = require('../index');

const Expert = sequelize.define('Expert', {
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

module.exports = Expert;