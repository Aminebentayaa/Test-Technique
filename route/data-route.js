// backend/routes/accommodationRoute.js
const { Router } = require('express');
const router = Router();
const dataController = require('../controller/dataController');


router.get('/fetch-and-save-accomodations', dataController.fetchAndSaveAccomodations);
router.get('/city-distribution', dataController.getCityDistribution);
router.get('/pmr-family-room-correlation', dataController.getPmrFamilyRoomCorrelation);
router.get('/prestation-distribution', dataController.getPrestationDistribution);
router.get('/etablissements-par-ville', dataController.getEtablissementsParVille);


module.exports = router;
