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
    salary: {
        type: Sequelize.FLOAT,
        allowNull: true, // или false, в зависимости от вашего требования
    }
});

module.exports = Profession;