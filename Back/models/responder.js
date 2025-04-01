const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

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

// Association: A Responder belongs to a User.
Responder.associate = models => {
  Responder.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
};

module.exports = Responder;
