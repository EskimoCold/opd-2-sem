const User = require('../db/models/User');
const Expert = require('../db/models/Expert');

// Функция для создания нового пользователя и при необходимости добавления его в список экспертов
async function createUser(userData) {
    try {
        // Создание нового пользователя
        const user = await User.create(userData);

        // Проверка, является ли пользователь экспертом
        if (user.isExpert) {
            // Если пользователь эксперт, добавляем его в список экспертов
            await Expert.create({
                name: user.username // Используем имя пользователя в качестве имени эксперта
            });
        }

        return user; // Возвращаем созданного пользователя
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user'); // Бросаем ошибку, если возникла проблема при создании пользователя
    }
}

module.exports = { createUser };
