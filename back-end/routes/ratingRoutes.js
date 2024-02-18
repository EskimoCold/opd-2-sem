const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

router.get('/calculate-total-rating', ratingController.calculateTotalRating);

module.exports = router;
