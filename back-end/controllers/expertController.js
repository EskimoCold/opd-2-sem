const Rating = require('../db/models/Ratings');
const Quality = require('../db/models/Quality');
const Expert = require('../db/models/Expert');
const sequelize = require('../db/index');

const {Op} = require("sequelize");

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
