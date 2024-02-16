const express = require('express');
const authorize = require('../middleware/authorize');
const router = express.Router();

// An example protected route
router.get('/protected', authorize, (req, res) => {
    res.send('This is a protected route. You are authenticated.');
});

module.exports = router;
