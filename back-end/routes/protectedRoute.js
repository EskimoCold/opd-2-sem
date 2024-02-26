const express = require('express');
const authorize = require('../middleware/authorize');
const router = express.Router();
const Profession = require('../db/models/Profession');
const Quality = require('../db/models/Quality');
const Rating = require('../db/models/Ratings');
const sequelize = require('../db/index');
const { Op } = require('sequelize')
// An example protected route
router.get('/protected', authorize, (req, res) => {
    res.send('This is a protected route. You are authenticated.');
});


router.post('/protected/profession/create',authorize, async (req, res) => {
    if (!req.body.name ) {
        return res.status(400).send('Profession name is required.');
    }

    try{
        const profession = await Profession.create({
            name: req.body.name,
            salary:req.body.salary
        });
        return res.status(200).json(profession);
    } catch (error) {
        return res.status(500).json({ error })
    }
});

router.post('/protected/profession/destroy',authorize, async (req, res) => {
    if (!req.body.id) {
        return res.status(400).send('Profession.id  is required.');
    }
    const id=req.body.id;
    try{
        const num = await Profession.destroy({
            where: { id }
        });
        return res.status(200).json(profession);
    } catch (error) {
        return res.status(500).json({ error })
    }
});
router.put("/protected/profession/update/:id",authorize, async (req, res) => {
    const  id =  req.params.id;
    const  data =  req.body;
    try {
        const  profession = await  Profession.update(data, {
            where: { id },
            returning: true,
        });
        res.status(200).send({
            msg: "Profession  updated"
        });
    }catch(err) {
        return res.status(500).send({
            message: err.message
        });
    }
});



// An example protected route
//router.get('/protected', authorize, (req, res) => {
//    res.send('This is a protected route. You are authenticated.');
//});


router.post('/protected/quality/create',authorize, async (req, res) => {
    if (!req.body.name ) {
        return res.status(400).send('Quality  is required.');
    }

    try{
        const quality = await Quality.create({
            name: req.body.name,
        });
        return res.send(res.json(quality));
    } catch (error) {
        res.status(500).send('Error add new quality.');
    }
});

router.post('/protected/quality/destroy',authorize, async (req, res) => {
    if (!req.body.id) {
        return res.status(400).send('Quality.id  is required.');
    }
    const id=req.body.id;
    try{
        const num = await Quality.destroy({
            where: {id:  id }
        });
        return res.send(`${num} number of records were deleted`);
    } catch (error) {
        res.status(500).send('Error delete quality.');
    }
});
router.put("/protected/quality/update/:id",authorize, async (req, res) => {
    const  id =  req.params.id;
    const  data =  req.body;
    try {
        const  quality= await  Quality.update(data, {
            where: {id: id},
            returning: true,
        });
        res.status(200).send({
            msg: "Quality updated"
        });
    }catch(err) {
        res.status(500).send({
            message: err.message
        });
    }
});

router.get("/protected/profession/getall", async (req, res) => {
    try {
        const pr = await sequelize.query('SELECT id,name,salary FROM "Professions"');
        res.status(200).send(pr[0]);
    }catch(err) {
        res.status(500).send({
            message: err.message
        });
    }
});


router.put("/protected/rating/:expertId/:professionId",authorize, async (req, res) => {
    //console.log("here");
    const  expertId =  req.params.expertId;
    const  professionId =  req.params.professionId;
    const  data =  req.body;
    //console.log(data);
    try {
        const num = await Rating.destroy({
            where:
                {[ Op.and ]: [
                        {expertId: expertId},
                        {professionId: professionId}
                    ]
                }
        });

        for (var r in data) {
            console.log(r);
            await Rating.create({
                qualityId: data[r].id,
                expertId: expertId,
                professionId: professionId,
                points: data[r].point
            });
        }


        res.status(200).send({
            msg: "Rating created"
        });
    }catch(err) {
        res.status(500).send({
            message: err.message
        });
    }
});


module.exports = router;

