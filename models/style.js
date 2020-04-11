'use strict';

const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Style = loader.database.define('styles',{
  styleId:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  length: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  style: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  gender: {
    type: Sequelize.TEXT,
    allowNull: false
  }
},{
  freezeTableName: true,
  timestamps: false
});

module.exports = Style;