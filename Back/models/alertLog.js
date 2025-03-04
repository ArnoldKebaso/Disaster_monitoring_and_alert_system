const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AlertLog = sequelize.define("AlertLog", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alertType: {
        type: DataTypes.STRING,
        allowNull: true, // Allow null
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true, // Allow null
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true, // Allow null
    },
    severity: {
        type: DataTypes.STRING,
        allowNull: true, // Allow null
    },
    water_levels: {
        type: DataTypes.JSON,
        allowNull: true, // Allow null
    },
    evacuation_routes: {
        type: DataTypes.JSON,
        allowNull: true, // Allow null
    },
    emergency_contacts: {
        type: DataTypes.JSON,
        allowNull: true, // Allow null
    },
    precautionary_measures: {
        type: DataTypes.JSON,
        allowNull: true, // Allow null
    },
    weather_forecast: {
        type: DataTypes.JSON,
        allowNull: true, // Allow null
    },
    timeSent: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = AlertLog;