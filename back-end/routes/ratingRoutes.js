const express = require('express');
const router = express.Router();
const expertController = require('../controllers/expertController');
const ratingController = require('../controllers/ratingController');
// Маршруты для получения списка согласных и несогласных экспертов
router.get('/agreed/:qualityId', expertController.getAgreedExperts);
router.get('/disagreed/:qualityId', expertController.getDisagreedExperts);

<<<<<<< Updated upstream
=======
// Маршруты для получения списка согласных и несогласных экспертов
router.get('/agreed/:qualityId', ratingController.getAgreedExperts);
router.get('/disagreed/:qualityId', ratingController.getDisagreedExperts);

>>>>>>> Stashed changes
// Маршрут для получения общего рейтинга ПВК
router.get('/calculate-total-rating', ratingController.calculateTotalRating);

module.exports = router;
