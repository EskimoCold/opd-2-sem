const Rating = require('../db/models/Ratings');
const sequelize = require('../db/index');

exports.calculateTotalRating = (req, res) => {
    Rating.findAll({
        attributes: ['qualityId', [sequelize.fn('AVG', sequelize.col('points')), 'avgRating']],
        group: ['qualityId']
    })
        .then(avgRatings => {
            const totalRating = avgRatings.reduce((total, avgRating) => total + avgRating.avgRating, 0);
            res.json({ totalRating });
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred while calculating the total rating' });
        });
};