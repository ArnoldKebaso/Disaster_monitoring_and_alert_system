
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

// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

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
//     // Instead of a JSON field, we will use a join table for locations.
// }, {
//     timestamps: false,
// });

// Subscription.associate = models => {
//   // Many-to-many relationship with Location through SubscriptionLocation
//   Subscription.belongsToMany(models.Location, { through: 'SubscriptionLocation', foreignKey: 'subscription_id', as: 'locations' });
// };

// module.exports = Subscription;