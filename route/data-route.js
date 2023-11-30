// data-route.js
const { Router } = require('express');
const router = Router();
const TrafficRestriction = require('../model/TrafficRestriction'); // Assurez-vous que le chemin d'importation est correct

router.get('/analyze-data', async (req, res) => {
  try {
    const averageSpeed = await TrafficRestriction.findOne({
      attributes: [[sequelize.fn('AVG', sequelize.col('vitesse')), 'average_speed']],
    });

    res.send(`Average Speed Limit: ${averageSpeed.dataValues.average_speed}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/get-all-data', async (req, res) => {
  try {
    const allData = await TrafficRestriction.findAll();
    res.json(allData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
