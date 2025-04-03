
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
  user_id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'The user who submitted the report (optional)',
  }
});
module.exports = CommunityReport;
// Define relationships
CommunityReport.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
  comment: 'The user who submitted the report (optional)',
});



// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const CommunityReport = sequelize.define('CommunityReport', {
//   report_id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   report_type: {
//     type: DataTypes.ENUM('FlashFlood', 'RiverFlood', 'CoastalFlood', 'UrbanFlood', 'ElNinoFlooding'),
//     allowNull: false,
//     comment: 'Specifies the type of flood being reported',
//   },
//   // Use a foreign key for location
//   location_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     comment: 'Foreign key referencing Locations',
//   },
//   description: {
//     type: DataTypes.TEXT,
//     comment: 'Details of the reported flood incident',
//   },
//   image_url: {
//     type: DataTypes.STRING,
//     comment: 'URL of the uploaded image (optional)',
//   },
//   status: {
//     type: DataTypes.ENUM('pending', 'verified', 'rejected'),
//     defaultValue: 'pending',
//     comment: 'Report verification status',
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW,
//     comment: 'Creation timestamp',
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW,
//     onUpdate: DataTypes.NOW,
//     comment: 'Last updated timestamp',
//   },
//   user_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     comment: 'ID of the reporting user',
//   },
//   verified_by: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//     comment: 'ID of the admin verifying the report',
//   }
// });

// CommunityReport.associate = models => {
//   // Each CommunityReport belongs to the reporting User.
//   CommunityReport.belongsTo(models.User, { foreignKey: 'user_id', as: 'reporter' });
//   // Each CommunityReport may be verified by an admin (User).
//   CommunityReport.belongsTo(models.User, { foreignKey: 'verified_by', as: 'verifier' });
//   // Each CommunityReport is associated with one Location.
//   CommunityReport.belongsTo(models.Location, { foreignKey: 'location_id', as: 'location' });
// };

// module.exports = CommunityReport;



