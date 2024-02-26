const express = require('express');
const router = express.Router();
const expertController = require('../controllers/expertController');

// GET /experts/agree/:qualityId
//router.get('/agree/:qualityId', expertController.getAgreeExperts);

// GET /experts/disagree/:qualityId
//router.get('/disagree/:qualityId', expertController.getDisagreeExperts);
router.get("/protected/experts/all", async (req, res) => {
    try {
        const pr = await sequelize.query('SELECT id,username FROM "Users" where "isExpert"=\'t\'');
        res.status(200).send(pr[0]);
    }catch(err) {
        res.status(500).send({
            message: err.message
        });
    }
});
module.exports = router;
