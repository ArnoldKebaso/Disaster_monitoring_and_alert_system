const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Flood = sequelize.define('Flood', {
    flood_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    water_level: {
        type: DataTypes.FLOAT, // Water level in meters
        allowNull: false,
    },
    date_recorded: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('normal', 'alert', 'critical'),
        defaultValue: 'normal',
    }
});

module.exports = Flood;
