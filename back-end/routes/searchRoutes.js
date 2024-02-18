const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Эндпоинт для поиска по профессиям
router.get('/professions', searchController.searchProfessions);

// Эндпоинт для поиска по пользователям
router.get('/users', searchController.searchUsers);

// Эндпоинт для поиска по качествам
router.get('/qualities', searchController.searchQualities);

// Эндпоинт для сортировки профессий по зарплате
router.get('/professions/sort-by-salary', searchController.sortProfessionsBySalary);

// Эндпоинт для сортировки профессий по зарплате в обратном порядке
router.get('/professions/sort-by-salary-reverse', searchController.sortProfessionsBySalary_reverse);

// Эндпоинт для поиска профессии по качеству
router.get('/professions/search-by-quality', searchController.searchProfessionsByQuality)

module.exports = router;
