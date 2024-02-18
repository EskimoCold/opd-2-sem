const Sequelize = require('sequelize');
const sequelize = require('../index');

const Rating = sequelize.define('Rating', {
    qualityId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Qualities',
            key: 'id',
        },
        allowNull: false,
    },
    expertId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Experts',
            key: 'id',
        },
        allowNull: false,
    },
    points: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
});

module.exports = Rating;