// backend/controllers/dataController.js
const axios = require('axios');
const sequelize = require('../sequelize');
const Accomodation = require('../model/Accomodation');  // Make sure the path is correct

async function fetchAndSaveAccomodations(req, res) {
  try {
    // Fetch data from the API
    const apiResponse = await axios.get('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/accessibilite-des-hebergements-en-ile-de-france-paris-je-t-aime/records?limit=5');

    // Log the entire API response
    console.log(apiResponse.data);

    // Assuming the data you need is nested under apiResponse.data.records
    const dataToInsert = apiResponse.data.results;
    console.log(apiResponse.data);
    // Ensure the database is synchronized
    

    // Loop through the data and insert into the database
    for (const data of dataToInsert) {
      try {
        await Accomodation.create(data);
      } catch (error) {
        console.error('Error creating accomodation:', error);
      }
    }

    res.send('Data fetched and saved to the database');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function getAllAccomodations(req, res) {
  try {
    const accommodations = await Accomodation.findAll();
    res.json(accommodations);
  } catch (error) {
    console.error('Error fetching all accommodations:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function getAccomodationById(req, res) {
  const { id } = req.params;
  try {
    const accommodation = await Accomodation.findByPk(id);
    if (accommodation) {
      res.json(accommodation);
    } else {
      res.status(404).send('Accommodation not found');
    }
  } catch (error) {
    console.error('Error fetching accommodation by ID:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function getCityDistribution(req, res) {
  try {
    const cityDistribution = await Accomodation.findAll({
      attributes: ['ville', [sequelize.fn('COUNT', 'ville'), 'count']],
      group: ['ville'],
    });

    res.json(cityDistribution);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function getPmrFamilyRoomCorrelation(req, res) {
  try {
    const correlation = await Accomodation.findAll({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('nb_chambres_pmr')), 'average_pmr_rooms'],
        [sequelize.fn('AVG', sequelize.col('nb_chambres_famille')), 'average_family_rooms'],
      ],
    });

    res.json(correlation);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function getEtablissementsParVille(req, res) {
  try {
    // Utilisez sequelize pour récupérer les établissements par ville
    const etablissementsParVille = await Accomodation.findAll({
      attributes: ['ville', 'etablissement'],
      order: ['ville', 'etablissement'],
    });

    res.json(etablissementsParVille);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


async function getPrestationDistribution(req, res) {
  try {
    // Logique pour obtenir la distribution par prestation

    // Exemple de réponse (remplacez cela par votre propre logique)
    const prestationDistribution = await Accommodation.findAll({
      attributes: ['prestations', [Sequelize.fn('COUNT', 'id'), 'count']],
      group: ['prestations'],
    });

    res.json(prestationDistribution);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
// Count occurrences of each service for "Services Par Chambre" based on ville and nom_de_la_chambre
async function getServicesParChambre(req, res) {
  try {
    const servicesParChambre = await Accomodation.findAll({
      attributes: [
        'ville',
        'nom_de_la_chambre',
        'services',
        [sequelize.fn('COUNT', sequelize.col('services')), 'nombre_de_services'],
      ],
      group: ['ville', 'nom_de_la_chambre', 'services'],
    });

    res.json(servicesParChambre);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


module.exports = {
  fetchAndSaveAccomodations,
  getAllAccomodations,
  getAccomodationById,
  getServicesParChambre,
  getPmrFamilyRoomCorrelation,
  getCityDistribution,
  getEtablissementsParVille,
  getPrestationDistribution,
};
