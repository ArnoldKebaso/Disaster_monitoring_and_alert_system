const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Healthcare = sequelize.define('Healthcare', {
    facility_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    capacity: {
        type: DataTypes.INTEGER, // Number of beds available
    },
    contact_number: {
        type: DataTypes.STRING,
    },
    resources_available: {
        type: DataTypes.JSON, // Example: { "medicines": ["Paracetamol", "Insulin"], "ambulances": 3 }
    }
});

module.exports = Healthcare;
