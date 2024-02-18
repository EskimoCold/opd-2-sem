const Profession = require('../db/models/Profession');

// Функция для создания новой профессии
async function createProfession(professionData) {
    try {
        // Создание новой профессии
        return await Profession.create(professionData); // Возвращаем созданную профессию
    } catch (error) {
        console.error('Error creating profession:', error);
        throw new Error('Failed to create profession'); // Бросаем ошибку, если возникла проблема при создании профессии
    }
}

// Функция для обновления существующей профессии
async function updateProfession(professionId, newData) {
    try {
        // Обновление данных профессии по идентификатору
        const [updatedRowsCount, updatedRows] = await Profession.update(newData, {
            where: { id: professionId },
            returning: true // Возврат обновленных данных
        });

        if (updatedRowsCount === 0) {
            throw new Error('Profession not found'); // Если профессия не найдена, бросаем ошибку
        }

        return updatedRows[0]; // Возвращаем обновленную профессию
    } catch (error) {
        console.error('Error updating profession:', error);
        throw new Error('Failed to update profession'); // Бросаем ошибку, если возникла проблема при обновлении профессии
    }
}

// Функция для удаления профессии
async function deleteProfession(professionId) {
    try {
        // Удаление профессии по идентификатору
        const deletedRowCount = await Profession.destroy({
            where: { id: professionId }
        });

        if (deletedRowCount === 0) {
            throw new Error('Profession not found'); // Если профессия не найдена, бросаем ошибку
        }

        return deletedRowCount; // Возвращаем количество удаленных строк (должно быть 1)
    } catch (error) {
        console.error('Error deleting profession:', error);
        throw new Error('Failed to delete profession'); // Бросаем ошибку, если возникла проблема при удалении профессии
    }
}

module.exports = { createProfession, updateProfession, deleteProfession };
