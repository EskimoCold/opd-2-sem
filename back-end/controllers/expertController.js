const { Rating, Quality, Expert, sequelize } = require('../db/models');

// Получение списка согласных экспертов по определенному профессиональному качеству
exports.getAgreeExperts = (req, res) => {
    const qualityId = req.params.qualityId;
    Rating.findAll({
        where: { qualityId: qualityId, points: { [sequelize.Op.gt]: 0 } },
        include: [{ model: Expert, attributes: ['id', 'name'] }],
        attributes: [],
        raw: true,
    })
        .then(experts => {
            res.json({ agreeExperts: experts });
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred while fetching agree experts' });
        });
};

// Получение списка несогласных экспертов по определенному профессиональному качеству
exports.getDisagreeExperts = (req, res) => {
    const qualityId = req.params.qualityId;
    Rating.findAll({
        where: { qualityId: qualityId, points: { [sequelize.Op.lt]: 0 } },
        include: [{ model: Expert, attributes: ['id', 'name'] }],
        attributes: [],
        raw: true,
    })
        .then(experts => {
            res.json({ disagreeExperts: experts });
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred while fetching disagree experts' });
        });
};
