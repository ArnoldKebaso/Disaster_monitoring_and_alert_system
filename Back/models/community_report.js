const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CommunityReport = sequelize.define('CommunityReport', {
  report_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  report_type: {
    type: DataTypes.ENUM('FlashFlood', 'RiverFlood', 'CoastalFlood', 'UrbanFlood', 'ElNinoFlooding'),
    allowNull: false,
    comment: 'Specifies the type of flood being reported',
  },
  // Use location_id to reference the Locations table
  location_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Foreign key referencing Locations',
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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'ID of the user who submitted the report',
  }
});

// Associations: A CommunityReport belongs to a User (submitter) and to a Location.
// Additionally, a report may be verified by a user (admin), which we can define as another association.
CommunityReport.associate = models => {
  CommunityReport.belongsTo(models.User, { foreignKey: 'user_id', as: 'reporter' });
  CommunityReport.belongsTo(models.User, { foreignKey: 'verified_by', as: 'verifier' });
  CommunityReport.belongsTo(models.Location, { foreignKey: 'location_id', as: 'location' });
};

module.exports = CommunityReport;



// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
// const User = require('./user');


// const CommunityReport = sequelize.define('CommunityReport', {
//   report_id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   report_type: {
//     type: DataTypes.ENUM(
//       'FlashFlood',
//       'RiverFlood',
//       'CoastalFlood',
//       'UrbanFlood',
//       'ElNinoFlooding'
//     ),
//     allowNull: false,
//     comment: 'Specifies the type of flood being reported',
//   },
//   location: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     comment: 'Specific location of the flood incident',
//   },
//   description: {
//     type: DataTypes.TEXT,
//     comment: 'Details or description of the reported flood incident',
//   },
//   image_url: {
//     type: DataTypes.STRING,
//     comment: 'URL of the uploaded image for the report (optional)',
//   },
//   status: {
//     type: DataTypes.ENUM('pending', 'verified', 'rejected'),
//     defaultValue: 'pending',
//     comment: 'Status of the report (pending verification by the admin)',
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW,
//     comment: 'Timestamp for when the report was created',
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW,
//     onUpdate: DataTypes.NOW,
//     comment: 'Timestamp for when the report was last updated',
//   },
//   user_id:{
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     defaultValue: 0,
//     comment: 'The user who submitted the report (optional)',
//   }
// });
// module.exports = CommunityReport;
// // Define relationships
// CommunityReport.belongsTo(User, {
//   foreignKey: 'user_id',
//   onDelete: 'SET NULL',
//   onUpdate: 'CASCADE',
//   comment: 'The user who submitted the report (optional)',
// });


