const Location = require('../models/location');

// Get all location data
const getAllLocations = async (req, res) => {
    try {
        const locations = await Location.findAll();
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get location by ID
const getLocationById = async (req, res) => {
    try {
        const location = await Location.findByPk(req.params.id);
        if (!location) return res.status(404).json({ error: 'Location not found' });
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new location record
const createLocation = async (req, res) => {
    const { region_name, risk_level, evacuation_routes, key_facilities } = req.body;
    try {
        const newLocation = await Location.create({ region_name, risk_level, evacuation_routes, key_facilities });
        res.status(201).json(newLocation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update location by ID
const updateLocation = async (req, res) => {
    try {
        const location = await Location.findByPk(req.params.id);
        if (!location) return res.status(404).json({ error: 'Location not found' });

        const updatedLocation = await location.update(req.body);
        res.status(200).json(updatedLocation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete location by ID
const deleteLocation = async (req, res) => {
    try {
        const location = await Location.findByPk(req.params.id);
        if (!location) return res.status(404).json({ error: 'Location not found' });

        await location.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllLocations, getLocationById, createLocation, updateLocation, deleteLocation };
