// sequelize.js
const { Sequelize } = require('sequelize');
const sequelizeInstance = new Sequelize('mysql://root:@localhost:3306/databiz');
module.exports = sequelizeInstance;
