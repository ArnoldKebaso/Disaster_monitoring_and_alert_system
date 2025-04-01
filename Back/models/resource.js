const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Resource = sequelize.define('Resource', {
    resource_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // Replace location with location_id
    location_id: {
        type: DataTypes.INTEGER,
        comment: 'References the Locations table',
    },
    last_updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

// Association: A Resource belongs to a Location (if applicable)
Resource.associate = models => {
  Resource.belongsTo(models.Location, { foreignKey: 'location_id', as: 'location' });
};

module.exports = Resource;


// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const Resource = sequelize.define('Resource', {
//     resource_id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     type: {
//         type: DataTypes.STRING, // Example: "food", "water", "medical kits"
//         allowNull: false,
//     },
//     quantity: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     location: {
//         type: DataTypes.STRING, // Warehouse or depot location
//     },
//     last_updated: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//     }
// });

// module.exports = Resource;
