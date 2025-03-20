const Alert = require('../models/alert');
const { Sequelize } = require('sequelize');
// Get all alerts
const getAllAlerts = async (req, res) => {
  try {
    const where = req.query.includeArchived ? {} : { status: ['active', 'resolved'] };

    if (req.query.location) where.location = req.query.location;

    const alerts = await Alert.findAll({ where });
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get alert by ID
const getAlertById = async (req, res) => {
  try {
    const alert = await Alert.findByPk(req.params.id);
    if (!alert) return res.status(404).json({ error: 'Alert not found' });
    res.status(200).json(alert);
  } catch (error) {
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
      status: 'active',
    });

    res.status(201).json(newAlert);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an alert by ID
const updateAlert = async (req, res) => {
  try {
    const alert = await Alert.findByPk(req.params.id);
    if (!alert) return res.status(404).json({ error: 'Alert not found' });

    const updatedAlert = await alert.update(req.body);
    res.status(200).json(updatedAlert);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an alert by ID
const deleteAlert = async (req, res) => {
  try {
    const alert = await Alert.findByPk(req.params.id);
    if (!alert) return res.status(404).json({ error: 'Alert not found' });

    await alert.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// In alertController.js

const getUniqueLocations = async (req, res) => {
  try {
    const locations = await Alert.findAll({
      attributes: [
        [Alert.sequelize.fn('DISTINCT', Alert.sequelize.col('location')), 'location']
      ],
      order: [[Alert.sequelize.col('location'), 'ASC']]
    });

    // Extract locations using dataValues
    const locationList = locations.map(item => item.dataValues.location).filter(Boolean);

    console.log('Locations found:', locationList);  // Debug log
    res.status(200).json(locationList);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json([]);
  }
};

const archiveAlert = async (req, res) => {
  try {
    const alert = await Alert.findByPk(req.params.id);
    if (!alert) return res.status(404).json({ error: 'Alert not found' });

    // Only update the status; Sequelize will handle updatedAt automatically
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
const unarchiveAlert = async (req, res) => {
  try {
    const alert = await Alert.findByPk(req.params.id);
    if (!alert) return res.status(404).json({ error: 'Alert not found' });

    // Optionally, ensure that only archived alerts can be unarchived
    if (alert.status !== 'archived') {
      return res.status(400).json({ error: 'Alert is not archived' });
    }

    const updatedAlert = await alert.update({
      status: 'active'  // or 'resolved', as appropriate
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





module.exports = { getAllAlerts, getAlertById, createAlert, updateAlert, deleteAlert, getUniqueLocations, archiveAlert,unarchiveAlert };
