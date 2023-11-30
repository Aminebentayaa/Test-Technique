const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const TrafficRestriction = sequelize.define('TrafficRestriction', {
  reglement: {
    type: DataTypes.STRING,
  },
  limitation: {
    type: DataTypes.STRING,
  },
  vitesse: {
    type: DataTypes.STRING,
  },
  categorie: {
    type: DataTypes.STRING,
  },
});

module.exports = TrafficRestriction;
