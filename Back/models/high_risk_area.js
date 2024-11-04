const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const HighRiskArea = sequelize.define('HighRiskArea', {
  area_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  coordinates: {
    type: DataTypes.STRING,
  },
});

module.exports = HighRiskArea;
