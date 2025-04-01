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
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'reporter', 'viewer'),
    allowNull: false,
    defaultValue: 'viewer',
  },
  currentToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profilePhoto: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '',
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

// Associations – defined later in the index file
User.associate = models => {
  // A user may submit many community reports
  User.hasMany(models.CommunityReport, { foreignKey: 'user_id', as: 'reports' });
  // A user (admin) may verify many community reports
  User.hasMany(models.CommunityReport, { foreignKey: 'verified_by', as: 'verifiedReports' });
  // A user may also be a responder (if applicable)
  User.hasMany(models.Responder, { foreignKey: 'user_id', as: 'responders' });
};

module.exports = User;
