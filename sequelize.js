// sequelize.js
const { Sequelize } = require('sequelize');
const sequelizeInstance = new Sequelize('mysql://root:@mysql:3306/databiz', {
  dialectOptions: {
    createDatabase: true,
  },
});
module.exports = sequelizeInstance;
