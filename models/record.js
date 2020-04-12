'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Record = loader.database.define('records',{
  recordId:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    defaultValue: 1
  },
  competitionId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  swimmerId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  split: {
    type: Sequelize.ARRAY(Sequelize.DOUBLE(6,2)),
    allowNull: false
  },
  rap: {
    type:Sequelize.ARRAY(Sequelize.DOUBLE(6,2)),
    allowNull: true
  },
  styleId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
},{
  freezeTableName: true,
  timestamps: false,
  indexes:[
    {
      fields: ['swimmerId']
    },
    {
      fields: ['competitionId']
    },
    {
      fields: ['styleId']
    }
  ]
});

module.exports = Record;