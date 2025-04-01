const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Location = sequelize.define('Location', {
    location_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    region_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    risk_level: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        defaultValue: 'low',
    },
    evacuation_routes: {
        type: DataTypes.JSON,
        comment: 'Array of evacuation route objects',
    },
    key_facilities: {
        type: DataTypes.JSON,
        comment: 'Array of key facility objects (e.g., shelters)',
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

// Associations: A Location has many Alerts, CommunityReports, Floods, and Resources.
Location.associate = models => {
  Location.hasMany(models.Alert, { foreignKey: 'location_id', as: 'alerts' });
  Location.hasMany(models.CommunityReport, { foreignKey: 'location_id', as: 'communityReports' });
  Location.hasMany(models.Flood, { foreignKey: 'location_id', as: 'floods' });
  Location.hasMany(models.Resource, { foreignKey: 'location_id', as: 'resources' });
};

module.exports = Location;



// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const Location = sequelize.define('Location', {
//     location_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     region_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     risk_level: {
//         type: DataTypes.ENUM('low', 'medium', 'high'),
//         defaultValue: 'low',
//     },
//     evacuation_routes: {
//         type: DataTypes.JSON, // Example: [{ "route_name": "Route A", "distance_km": 5 }]
//     },
//     key_facilities: {
//         type: DataTypes.JSON, // Example: [{ "type": "shelter", "name": "Shelter A", "capacity": 100 }]
//     }
// });

// module.exports = Location;
