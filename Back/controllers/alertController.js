const Alert = require('../models/alert');

// Get all alerts
const getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.findAll();
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
  const { alert_type, severity, location, description, status } = req.body;
  try {
    const newAlert = await Alert.create({
      alert_type,
      severity,
      location,
      description,
      status
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

module.exports = { getAllAlerts, getAlertById, createAlert, updateAlert, deleteAlert };
