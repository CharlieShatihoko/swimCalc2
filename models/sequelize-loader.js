'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  pocess.env.DATABESE_URL || 'postgres://postgres:postgres@localhost/swimrecord',
  {
    operatorsAliases: false
  });

module.exports = {
  database: sequelize,
  Sequelize: Sequelize
};