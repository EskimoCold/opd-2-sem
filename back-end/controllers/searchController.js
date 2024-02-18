const Profession = require('../db/models/Profession');
const User = require('../db/models/User');
const Quality = require('../db/models/Quality');
const {Op} = require('sequelize');
const ProfessionQualities = require('../db/models/ProfessionQualities');

exports.searchProfessions = async (req, res) => {
    try {
        const {query} = req.query;
        const professions = await Profession.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${query}%`
                }
            }
        });
        res.json({professions});
    } catch (error) {
        console.error('Error searching professions:', error);
        res.status(500).json({error: 'An error occurred while searching professions'});
    }
};

exports.searchUsers = async (req, res) => {
    try {
        const {query} = req.query;
        const users = await User.findAll({
            where: {
                username: {
                    [Op.iLike]: `%${query}%`
                }
            }
        });
        res.json({users});
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({error: 'An error occurred while searching users'});
    }
};

exports.sortProfessionsBySalary = async (req, res) => {
    try {
        // Ищем все профессии и сортируем их по зарплате в возрастающем порядке
        const sortedProfessions = await Profession.findAll({
            order: [['salary', 'ASC']]
        });

        // Отправляем отсортированный список профессий в ответе
        res.json({sortedProfessions});
    } catch (error) {
        // Обработка ошибок
        console.error('Error sorting professions by salary:', error);
        res.status(500).json({error: 'An error occurred while sorting professions by salary'});
    }
};
exports.sortProfessionsBySalary_reverse = async (req, res) => {
    try {
        // Ищем все профессии и сортируем их по зарплате в убывающем порядке
        const sortedProfessions = await Profession.findAll({
            order: [['salary', 'DESC']]
        });

        // Отправляем отсортированный список профессий в ответе
        res.json({sortedProfessions});
    } catch (error) {
        // Обработка ошибок
        console.error('Error sorting professions by salary:', error);
        res.status(500).json({error: 'An error occurred while sorting professions by salary'});
    }
};

exports.searchQualities = async (req, res) => {
    try {
        const {query} = req.query;
        const qualities = await Quality.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${query}%`
                }
            }
        });
        res.json({qualities});
    } catch (error) {
        console.error('Error searching qualities:', error);
        res.status(500).json({error: 'An error occurred while searching qualities'});
    }
};

exports.searchProfessionsByQuality = async (req, res) => {
    try {
        const {query} = req.query;

        const quality = await Quality.findOne({
            where: {
                name: {
                    [Op.iLike]: `%${query}%` // Используем оператор iLike для поиска с учетом регистра
                }
            }
        });

        if (!quality) {
            return res.status(404).json({message: 'Качество не найдено'});
        }

        // Находим все профессии, связанные с найденным качеством
        const professions = await Profession.findAll({
            include: [{
                model: ProfessionQualities,
                where: {
                    qualityId: quality.id
                },
                attributes: [] // Не включаем атрибуты из таблицы ProfessionQualities
            }]
        });

        res.json({professions});
    } catch (error) {
        console.error('Error searching professions by quality:', error);
        res.status(500).json({error: 'An error occurred while searching professions by quality'});
    }
};