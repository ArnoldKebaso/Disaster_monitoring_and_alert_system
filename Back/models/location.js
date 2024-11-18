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
        type: DataTypes.JSON, // Example: [{ "route_name": "Route A", "distance_km": 5 }]
    },
    key_facilities: {
        type: DataTypes.JSON, // Example: [{ "type": "shelter", "name": "Shelter A", "capacity": 100 }]
    }
});

module.exports = Location;
