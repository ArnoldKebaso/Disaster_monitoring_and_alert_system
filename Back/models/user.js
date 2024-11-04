const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'reporter', 'viewer'),
    allowNull: false,
  }
});

module.exports = User;
