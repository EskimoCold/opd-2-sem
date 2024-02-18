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
<<<<<<< Updated upstream
    isExpert: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
=======
    is_expert: Sequelize.BOOLEAN
>>>>>>> Stashed changes
});

module.exports = User;
