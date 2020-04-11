'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Record = loader.database.define('records',{
  recordId:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
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
    allowNull: false
  },
  styleId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
},{
  freezeTableName: true,
  timesramps: false,
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