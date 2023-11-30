// controller.js
const axios = require('axios');
const TrafficRestriction = require('../model/TrafficRestriction');

async function fetchAndSaveData(req, res) {
  try {
    const apiResponse = await axios.get('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/jsv_perim_restriction_circulation/records?limit=20');
    const dataToInsert = apiResponse.data.results;

    await TrafficRestriction.sync({ force: true });

    for (const data of dataToInsert) {
      await TrafficRestriction.create({
        reglement: data.reglement,
        limitation: data.limitation,
        vitesse: data.vitesse,
        categorie: data.categorie,
      });
    }

    res.send('Data fetched and saved to the database');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { fetchAndSaveData };
