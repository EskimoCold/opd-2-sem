const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../db/models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send('Username and password are required.');
    }

    try {
        const existingUser = await User.findOne({ where: { username: req.body.username } });
        if (existingUser) {
            return res.status(400).send('Username already taken.');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            username: req.body.username,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).send({ userId: user.id, username: user.username, token });
    } catch (error) {
        res.status(500).send('Error registering new user.');
    }
});

router.post('/login', async (req, res) => {
    // Check if username and password are provided
    if (!req.body.username || !req.body.password) {
        return res.status(400).send('Username and password are required.');
    }

    try {
        // Find the user by username
        const user = await User.findOne({ where: { username: req.body.username } });
        if (!user) {
            return res.status(401).send('Incorrect username or password.');
        }

        // Compare provided password with the hashed password in the database
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword) {
            return res.status(401).send('Incorrect username or password.');
        }

        // Generate a JWT for the user
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' } 
        );

        res.send({ userId: user.id, username: user.username, token });
    } catch (error) {
        res.status(500).send('Login failed.');
    }
});

module.exports = router;
