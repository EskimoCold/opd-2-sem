const express = require('express');
const router = express.Router();
const expertController = require('../controllers/expertController');
const ratingController = require('../controllers/ratingController');
const sequelize = require("../db");
// Маршруты для получения списка согласных и несогласных экспертов
//router.get('/agreed/:qualityId', expertController.getAgreedExperts);
//router.get('/disagreed/:qualityId', expertController.getDisagreedExperts);

// Маршрут для получения общего рейтинга ПВК
//router.get('/calculate-total-rating', ratingController.calculateTotalRating);


router.get("/rating/:professionid", async (req, res) => {
    try {
        const pid = req.params.professionid;
        const pr
            = await sequelize.query('SELECT qid,qname,rating FROM rating where pid='+pid+' order by rating desc');
        res.status(200).send(pr[0]);
    }catch(err) {
        res.status(500).send({
            message: err.message
        });
    }
});
router.get("/agreed/:professionid", async (req, res) => {
    try {
        const pid = req.params.professionid;
        const pr
            = await sequelize.query('SELECT exid,b.username,pid,agree ' +
            'FROM agree a,"Users" b where a.exid=b.id and  pid='+pid+' and agree=\'t\' order by b.username');
        res.status(200).send(pr[0]);
    }catch(err) {
        res.status(500).send({
            message: err.message
        });
    }
});
router.get("/disagreed/:professionid", async (req, res) => {
    try {
        const pid = req.params.professionid;
        const pr
            = await sequelize.query('SELECT exid,b.username,pid,agree ' +
            'FROM agree a,"Users" b where a.exid=b.id and  pid='+pid+' and agree=\'f\' order by b.username');
        res.status(200).send(pr[0]);
    }catch(err) {
        res.status(500).send({
            message: err.message
        });
    }
});


module.exports = router;
