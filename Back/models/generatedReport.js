const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Alert = require('./alert');

const GeneratedReport = sequelize.define('GeneratedReport', {
    report_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    alert_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    report_details: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'generated_reports',
});

// Define relationships
// GeneratedReport.belongsTo(Alert, { foreignKey: 'alert_id' });

module.exports = GeneratedReport;
