const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const CommunityReport = sequelize.define('CommunityReport', {
  report_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  report_type: {
    type: DataTypes.ENUM(
      'FlashFlood',
      'RiverFlood',
      'CoastalFlood',
      'UrbanFlood',
      'ElNinoFlooding'
    ),
    allowNull: false,
    comment: 'Specifies the type of flood being reported',
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Specific location of the flood incident',
  },
  description: {
    type: DataTypes.TEXT,
    comment: 'Details or description of the reported flood incident',
  },
  image_url: {
    type: DataTypes.STRING,
    comment: 'URL of the uploaded image for the report (optional)',
  },
  status: {
    type: DataTypes.ENUM('pending', 'verified', 'rejected'),
    defaultValue: 'pending',
    comment: 'Status of the report (pending verification by the admin)',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    comment: 'Timestamp for when the report was created',
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
    comment: 'Timestamp for when the report was last updated',
  },
});

// Define relationships
CommunityReport.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
  comment: 'The user who submitted the report (optional)',
});

module.exports = CommunityReport;
