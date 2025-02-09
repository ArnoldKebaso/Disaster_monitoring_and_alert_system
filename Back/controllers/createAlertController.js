const Alert = require('../models/alert');

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

module.exports = { createAlert };