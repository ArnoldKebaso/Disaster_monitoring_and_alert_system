const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Responder = sequelize.define('Responder', {
    responder_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    availability: {
        type: DataTypes.ENUM('available', 'busy', 'unavailable'),
        defaultValue: 'available',
    },
    assigned_task: {
        type: DataTypes.TEXT,
    },
}, {
    timestamps: true,
    tableName: 'responders',
});

Responder.associate = models => {
  // Each Responder belongs to one User.
  Responder.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
};

module.exports = Responder;

