const express = require('express');
const router = express.Router();
const expertController = require('../controllers/expertController');

// GET /experts/agree/:qualityId
router.get('/agree/:qualityId', expertController.getAgreeExperts);

// GET /experts/disagree/:qualityId
router.get('/disagree/:qualityId', expertController.getDisagreeExperts);

module.exports = router;
