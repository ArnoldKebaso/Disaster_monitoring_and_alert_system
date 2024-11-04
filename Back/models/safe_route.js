const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const SafeRoute = sequelize.define('SafeRoute', {
  route_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  start_location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  end_location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  }
});

module.exports = SafeRoute;
