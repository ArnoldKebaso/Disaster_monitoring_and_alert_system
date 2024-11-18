const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Infrastructure = sequelize.define('Infrastructure', {
    infrastructure_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    road_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('open', 'closed', 'damaged'),
        defaultValue: 'open',
    },
    last_checked: {
        type: DataTypes.DATE,
    },
    alternate_routes: {
        type: DataTypes.STRING, // Comma-separated alternative route names
    }
});

module.exports = Infrastructure;
