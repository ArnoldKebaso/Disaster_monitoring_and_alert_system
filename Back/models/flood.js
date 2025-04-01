const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Flood = sequelize.define('Flood', {
    flood_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    // Use location_id to reference Locations
    location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Foreign key referencing Locations',
    },
    water_level: {
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: 'Water level in meters',
    },
    date_recorded: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('normal', 'alert', 'critical'),
        defaultValue: 'normal',
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
});

Flood.associate = models => {
  // Each Flood record belongs to one Location.
  Flood.belongsTo(models.Location, { foreignKey: 'location_id', as: 'location' });
};

module.exports = Flood;


// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const Flood = sequelize.define('Flood', {
//     flood_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     location: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     water_level: {
//         type: DataTypes.FLOAT, // Water level in meters
//         allowNull: false,
//     },
//     date_recorded: {
//         type: DataTypes.DATE,
//         allowNull: false,
//     },
//     status: {
//         type: DataTypes.ENUM('normal', 'alert', 'critical'),
//         defaultValue: 'normal',
//     }
// });

// module.exports = Flood;
