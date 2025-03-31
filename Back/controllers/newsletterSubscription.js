// models/newsletterSubscription.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NewsletterSubscription = sequelize.define('NewsletterSubscription', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
    comment: 'Email address of the subscriber',
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = NewsletterSubscription;
