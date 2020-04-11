'use strict';

const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Swimmer = loader.database.define('swimmers',{
  swimerId:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  swimmerName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false
  }
},{
  freezeTableName: true,
  timestamps: false
});

module.exports = Swimmer;