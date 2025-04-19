const Alert = require('../models/alert');
const { Sequelize } = require('sequelize');

// Get all alerts
const getAllAlerts = async (req, res) => {
  try {
    // Determine query conditions based on request parameters
    const where = req.query.includeArchived ? {} : { status: ['active', 'resolved'] };

    // Filter by location if provided
    if (req.query.location) where.location = req.query.location;

    // Fetch alerts from the database
    const alerts = await Alert.findAll({ where });
    res.status(200).json(alerts);
  } catch (error) {
    // Handle server errors
    res.status(500).json({ error: error.message });
  }
};

// Get alert by ID
const getAlertById = async (req, res) => {
  try {
    // Find alert by primary key (ID)
    const alert = await Alert.findByPk(req.params.id);
    if (!alert) return res.status(404).json({ error: 'Alert not found' });
    res.status(200).json(alert);
  } catch (error) {
    // Handle server errors
    res.status(500).json({ error: error.message });
  }
};

// Create a new alert
const createAlert = async (req, res) => {
  const {
    alert_type,
    severity,
    location,
    description,
    water_levels,
    evacuation_routes,
    emergency_contacts,
    precautionary_measures,
    weather_forecast,
  } = req.body;

  try {
    // Create a new alert record in the database
    const newAlert = await Alert.create({
      alert_type,
      severity,
      location,
      description,
      water_levels,
      evacuation_routes,
      emergency_contacts,
      precautionary_measures,
      weather_forecast,
      status: 'active', // Default status for new alerts
    });

    res.status(201).json(newAlert);
  } catch (error) {
    // Handle validation or client errors
    res.status(400).json({ error: error.message });
  }
};

// Update an alert by ID
const updateAlert = async (req, res) => {
  try {
    // Find the alert by ID
    const alert = await Alert.findByPk(req.params.id);
    if (!alert) return res.status(404).json({ error: 'Alert not found' });

    // Update the alert with new data
    const updatedAlert = await alert.update(req.body);
    res.status(200).json(updatedAlert);
  } catch (error) {
    // Handle validation or client errors
    res.status(400).json({ error: error.message });
  }
};

// Delete an alert by ID
const deleteAlert = async (req, res) => {
  try {
    // Find the alert by ID
    const alert = await Alert.findByPk(req.params.id);
    if (!alert) return res.status(404).json({ error: 'Alert not found' });

    // Delete the alert from the database
    await alert.destroy();
    res.status(204).send(); // No content response
  } catch (error) {
    // Handle server errors
    res.status(500).json({ error: error.message });
  }
};

// Get unique locations from alerts
const getUniqueLocations = async (req, res) => {
  try {
    // Fetch distinct locations from the database
    const locations = await Alert.findAll({
      attributes: [
        [Alert.sequelize.fn('DISTINCT', Alert.sequelize.col('location')), 'location']
      ],
      order: [[Alert.sequelize.col('location'), 'ASC']] // Sort locations alphabetically
    });

    // Extract location values from the result
    const locationList = locations.map(item => item.dataValues.location).filter(Boolean);

    console.log('Locations found:', locationList); // Debug log
    res.status(200).json(locationList);
  } catch (error) {
    console.error('Error fetching locations:', error);
    // Return an empty array on error
    res.status(500).json([]);
  }
};

// Archive an alert by ID
const archiveAlert = async (req, res) => {
  try {
    // Find the alert by ID
    const alert = await Alert.findByPk(req.params.id);
    if (!alert) return res.status(404).json({ error: 'Alert not found' });

    // Update the alert status to 'archived'
    const updatedAlert = await alert.update({
      status: 'archived'
    });

    res.status(200).json(updatedAlert);
  } catch (error) {
    console.error('Archive error:', error);
    res.status(500).json({
      error: 'Failed to archive alert',
      details: error.message
    });
  }
};

// Unarchive an alert by ID
const unarchiveAlert = async (req, res) => {
  try {
    // Find the alert by ID
    const alert = await Alert.findByPk(req.params.id);
    if (!alert) return res.status(404).json({ error: 'Alert not found' });

    // Ensure the alert is currently archived
    if (alert.status !== 'archived') {
      return res.status(400).json({ error: 'Alert is not archived' });
    }

    // Update the alert status to 'active'
    const updatedAlert = await alert.update({
      status: 'active' // Change status to active or resolved as needed
    });

    res.status(200).json(updatedAlert);
  } catch (error) {
    console.error('Unarchive error:', error);
    res.status(500).json({
      error: 'Failed to unarchive alert',
      details: error.message
    });
  }
};

// Export all controller functions
module.exports = { 
  getAllAlerts, 
  getAlertById, 
  createAlert, 
  updateAlert, 
  deleteAlert, 
  getUniqueLocations, 
  archiveAlert, 
  unarchiveAlert 
};
