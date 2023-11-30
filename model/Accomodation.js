// backend/models/accommodation.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Accommodation = sequelize.define('Accomodation', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
  },
  etablissement: {
    type: DataTypes.STRING,
  },
  adresse: {
    type: DataTypes.STRING,
  },
  code_postal: {
    type: DataTypes.STRING,
  },
  ville: {
    type: DataTypes.STRING,
  },
  parking_nombre_de_places: {
    type: DataTypes.INTEGER,
  },
  nb_chambre_sourd: {
    type: DataTypes.INTEGER,
  },
  nb_chambre_aveugle: {
    type: DataTypes.INTEGER,
  },
  nb_chambres_communicantes: {
    type: DataTypes.INTEGER,
  },
  nb_chambres_famille: {
    type: DataTypes.INTEGER,
  },
  nb_chambre_senior: {
    type: DataTypes.INTEGER,
  },
  nb_chambres_pmr: {
    type: DataTypes.INTEGER,
  },
  point_geo: {
    type: DataTypes.JSON,
  },
  latitude: {
    type: DataTypes.FLOAT,
  },
  longitude: {
    type: DataTypes.FLOAT,
  },
  prestations: {
    type: DataTypes.JSON,
  },
  preselectionner_un_profil: {
    type: DataTypes.JSON,
  },
  lien_guide: {
    type: DataTypes.STRING,
  },
  parking: {
    type: DataTypes.JSON,
  },
  exterieurs: {
    type: DataTypes.JSON,
  },
  interieurs: {
    type: DataTypes.JSON,
  },
  services: {
    type: DataTypes.JSON,
  },
  personnel: {
    type: DataTypes.JSON,
  },
  chambres_adapees: {
    type: DataTypes.JSON,
  },
  nom_de_la_chambre: {
    type: DataTypes.STRING,
  },
});

module.exports = Accommodation;
