const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Demographics = sequelize.define('Demographics', {
    demographic_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    region: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    population_density: {
        type: DataTypes.FLOAT, // people per square kilometer
        allowNull: false,
    },
    age_distribution: {
        type: DataTypes.JSON, // Example: { "children": 30, "adults": 50, "seniors": 20 }
        allowNull: false,
    },
    vulnerable_population: {
        type: DataTypes.JSON, // Example: { "disabilities": 5, "low_income": 15 }
    }
});

module.exports = Demographics;
