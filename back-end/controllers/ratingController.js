const Rating = require('../db/models/Ratings');
const sequelize = require('../db/index');
const { Op } = require('sequelize');
const Expert = require('../db/models/expert');

exports.calculateTotalRating = (req, res) => {
    Rating.findAll({
        attributes: ['qualityId', [sequelize.fn('AVG', sequelize.col('points')), 'avgRating']],
        group: ['qualityId']
    })
        .then(avgRatings => {
            if (!avgRatings || avgRatings.length === 0 || !avgRatings[0].avgRating) {
                return res.status(404).json({ error: 'Данные оценок не найдены' });
            }
            const totalRating = avgRatings.reduce((total, avgRating) => total + avgRating.avgRating, 0);
            res.json({ totalRating });
        })
        .catch(error => {
            console.error('Error fetching total rating:', error);
            res.status(500).json({ error: 'Произошла ошибка при получении общего рейтинга' });
        });
};