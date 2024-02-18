const Sequelize = require('sequelize');
const sequelize = require('../index');

const ProfessionQualities = sequelize.define('ProfessionQualities', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    professionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    qualityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = ProfessionQualities;
