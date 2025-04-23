// Import required modules
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the NewsletterSubscription model
const NewsletterSubscription = sequelize.define('NewsletterSubscription', {
  id: {
    type: DataTypes.INTEGER, // Integer type for the primary key
    primaryKey: true, // Marks this field as the primary key
    autoIncrement: true, // Automatically increments the value for new records
  },
  email: {
    type: DataTypes.STRING, // String type for storing email addresses
    allowNull: false, // Email field cannot be null
    unique: true, // Ensures no duplicate email addresses
    validate: {
      isEmail: true, // Validates that the value is a valid email format
    },
    comment: 'Email address of the subscriber', // Description of the field
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Export the model for use in other parts of the application
module.exports = NewsletterSubscription;
