const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Alert = sequelize.define('Alert', {
    alert_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    alert_type: {
        type: DataTypes.ENUM('FlashFlood', 'RiverFlood', 'CoastalFlood', 'UrbanFlood', 'ElNinoFlooding'),
        allowNull: false,
    },
    severity: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        allowNull: false,
    },
    // Use location_id as a foreign key
    location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'References the Locations table',
    },
    description: {
        type: DataTypes.TEXT,
    },
    water_levels: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    evacuation_routes: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    emergency_contacts: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    precautionary_measures: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    weather_forecast: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('active', 'resolved'),
        defaultValue: 'active',
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
});

// Association: An Alert belongs to a Location
Alert.associate = models => {
  Alert.belongsTo(models.Location, { foreignKey: 'location_id', as: 'location' });
};

module.exports = Alert;




// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const Alert = sequelize.define('Alert', {
//     alert_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     alert_type: {
//         type: DataTypes.ENUM('FlashFlood', 'RiverFlood', 'CoastalFlood', 'UrbanFlood', 'ElNinoFlooding'),
//         allowNull: false,
//     },
//     severity: {
//         type: DataTypes.ENUM('Low', 'Medium', 'High'),
//         allowNull: false,
//     },
//     location: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     description: {
//         type: DataTypes.TEXT,
//     },
//     water_levels: {
//         type: DataTypes.JSON, // Store current and predicted water levels
//         allowNull: false,
//     },
//     evacuation_routes: {
//         type: DataTypes.JSON, // Store as an array of strings
//         allowNull: false,
//     },
//     emergency_contacts: {
//         type: DataTypes.JSON, // Store as an array of strings
//         allowNull: false,
//     },
//     precautionary_measures: {
//         type: DataTypes.JSON, // Store as an array of strings
//         allowNull: false,
//     },
//     weather_forecast: {
//         type: DataTypes.JSON, // Store next 24 and 48 hours forecast
//         allowNull: false,
//     },
//     status: {
//         type: DataTypes.ENUM('active', 'resolved', 'archived'),
//         defaultValue: 'active',
//     },
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
// });


// Alert.associate = models => {
//     Alert.belongsTo(models.Location, { foreignKey: 'location_id', as: 'location' });
//   };
// module.exports = Alert;
