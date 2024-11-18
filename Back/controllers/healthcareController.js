const Healthcare = require('../models/healthcare');

// Get all healthcare facilities
const getAllHealthcareFacilities = async (req, res) => {
    try {
        const facilities = await Healthcare.findAll();
        res.status(200).json(facilities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get healthcare facility by ID
const getHealthcareById = async (req, res) => {
    try {
        const facility = await Healthcare.findByPk(req.params.id);
        if (!facility) return res.status(404).json({ error: 'Healthcare facility not found' });
        res.status(200).json(facility);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new healthcare facility record
const createHealthcareFacility = async (req, res) => {
    const { name, location, capacity, contact_number, resources_available } = req.body;
    try {
        const newFacility = await Healthcare.create({ name, location, capacity, contact_number, resources_available });
        res.status(201).json(newFacility);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update healthcare facility by ID
const updateHealthcareFacility = async (req, res) => {
    try {
        const facility = await Healthcare.findByPk(req.params.id);
        if (!facility) return res.status(404).json({ error: 'Healthcare facility not found' });

        const updatedFacility = await facility.update(req.body);
        res.status(200).json(updatedFacility);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete healthcare facility by ID
const deleteHealthcareFacility = async (req, res) => {
    try {
        const facility = await Healthcare.findByPk(req.params.id);
        if (!facility) return res.status(404).json({ error: 'Healthcare facility not found' });

        await facility.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllHealthcareFacilities, getHealthcareById, createHealthcareFacility, updateHealthcareFacility, deleteHealthcareFacility };
