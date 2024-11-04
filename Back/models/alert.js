const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Alert = sequelize.define('Alert', {
  alert_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  alert_type: {
    type: DataTypes.ENUM('Flood', 'Earthquake', 'Wildfire', 'Tsunami', 'Tornado'),
    allowNull: false,
  },
  severity: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('active', 'resolved'),
    defaultValue: 'active',
  }
});

module.exports = Alert;
