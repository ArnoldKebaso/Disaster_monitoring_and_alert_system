const Alert = require('../models/alert');

// Create a new alert
const createAlert = async (req, res) => {
    const { alert_type, severity, location, description, status } = req.body;

    try {
        const newAlert = await Alert.create({
            alert_type,
            severity,
            location,
            description,
            status,
        });
        res.status(201).json(newAlert);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createAlert };
