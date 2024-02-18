const Rating = require('../db/models/Ratings');
const sequelize = require('../db/index');
const { Op } = require('sequelize');
<<<<<<< Updated upstream
const Expert = require('../db/models/expert');
=======
//const Expert = require('../db/models/expert');
>>>>>>> Stashed changes

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


exports.getAgreedExperts = (req, res) => {
    const qualityId = req.params.qualityId;
    Rating.findAll({
        where: { qualityId: qualityId, points: { [Op.gte]: 4 } },
        attributes: ['expertId'],
        include: [{ model: Expert, attributes: ['name'] }],
        raw: true
    })
        .then(agreedExperts => {
            if (!agreedExperts) {
                return res.json({ message: 'Согласованные эксперты не найдены' });
            }
            res.json({ agreedExperts });
        })
        .catch(error => {
            console.error('Error fetching agreed experts:', error);
            res.status(500).json({ error: 'Произошла ошибка при получении согласованных экспертов' });
        });
};

exports.getDisagreedExperts = async (req, res) => {
    const { qualityId } = req.params;
    try {
        const disagreedExperts = await Rating.findAll({
            attributes: ['expertId'],
            where: {
                qualityId,
                points: {
                    [Op.lt]: 3 // Например, если несогласные эксперты имеют оценку меньше 3
                }
            },
            include: [{ model: Expert, attributes: ['name'] }],
            raw: true
        });

        if (!disagreedExperts.length) {
            return res.json({ message: 'Эксперт не найден' });
        }

        const experts = disagreedExperts.map(expert => expert.name);
        res.json({ disagreedExperts: experts });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Произошла ошибка при поиске несогласных экспертов' });
    }
};

