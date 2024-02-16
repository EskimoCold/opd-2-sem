const User = require('../db/models/User');

const validateUsername = async (req, res, next) => {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user) {
        return res.status(400).send('Username already taken.');
    }
    next();
};

module.exports = validateUsername;
