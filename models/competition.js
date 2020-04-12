'use strict';

const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Competition = loader.database.define('competitions',{
  competitionId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull:true
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  name:{
    type: Sequelize.TEXT,
    allowNull: false
  }
},{
  freezeTableName: true,
  timestamps: false,
});

module.exports = Competition;