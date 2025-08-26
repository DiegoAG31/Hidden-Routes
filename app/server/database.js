const {Sequelize} = require('sequelize');
const config = require('../config/config.js');

const sequelize = new Sequelize(config.development);
module.exports = sequelize;