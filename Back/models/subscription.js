const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Subscription = sequelize.define("Subscription", {
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
        unique: true,
    },
    locations: {
        type: DataTypes.JSON,
        allowNull: false,
    },
});

module.exports = Subscription;



// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const Subscription = sequelize.define("Subscription", {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     method: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     contact: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//     },
//     locations: {
//         type: DataTypes.JSON, // Store multiple locations as an array
//         allowNull: false,
//     },
// });

// module.exports = Subscription;
