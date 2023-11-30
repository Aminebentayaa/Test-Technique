const express = require('express');
const app = express();
const sequelize = require('./sequelize.js');
const Accomodation = require('./model/Accomodation.js');
const cors = require('cors');

 // Assurez-vous que le chemin d'importation est correct
const accomodationRoutes = require('./route/data-route.js');
const { fetchAndSaveAccomodations, getCityDistribution, getPmrFamilyRoomCorrelation, getPrestationDistribution, getEtablissementsParVille, getServicesParChambre } = require('./controller/dataController.js');

const PORT = 3000;
app.use(cors());

app.get('/fetch-and-save-accomodations', fetchAndSaveAccomodations);
app.get('/city-distribution', getCityDistribution);
app.get('/pmr-family-room-correlation', getPmrFamilyRoomCorrelation);
app.get('/prestation-distribution',getPrestationDistribution );
app.get('/etablissements-par-ville', getEtablissementsParVille);
app.get('/services-par-chambre', getServicesParChambre);


app.use('/accomodations', accomodationRoutes);


sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Database synced.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
