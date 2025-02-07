const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Log = sequelize.define("Log", {
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
    timeSent: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Log; // Ensure the model is exported