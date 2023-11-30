

const express = require('express');
const app = express();
const sequelize = require('./sequelize');
const TrafficRestriction = require('./model/TrafficRestriction');
const dataRoutes = require('./route/data-route');  // Assurez-vous que le chemin d'importation est correct
const { fetchAndSaveData } = require('./controller/dataController');

const PORT = 3000;

app.get('/fetch-and-save', fetchAndSaveData);
app.use('/', dataRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
