const Alert = require('../models/alert');

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
            water_levels, // Ensure this field is included
            evacuation_routes, // Ensure this field is included
            emergency_contacts, // Ensure this field is included
            precautionary_measures, // Ensure this field is included
            weather_forecast, // Ensure this field is included
            status: 'active',
        });

        res.status(201).json(newAlert);
    } catch (error) {
        console.error('Database Error:', error); // Log database errors
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createAlert };