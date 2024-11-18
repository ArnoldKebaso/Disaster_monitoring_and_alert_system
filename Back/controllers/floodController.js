const Flood = require('../models/flood');

// Get all flood records
const getAllFloods = async (req, res) => {
    try {
        const floods = await Flood.findAll();
        res.status(200).json(floods);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get flood record by ID
const getFloodById = async (req, res) => {
    try {
        const flood = await Flood.findByPk(req.params.id);
        if (!flood) return res.status(404).json({ error: 'Flood record not found' });
        res.status(200).json(flood);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new flood record
const createFlood = async (req, res) => {
    const { location, water_level, date_recorded, status } = req.body;
    try {
        const newFlood = await Flood.create({ location, water_level, date_recorded, status });
        res.status(201).json(newFlood);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update flood record by ID
const updateFlood = async (req, res) => {
    try {
        const flood = await Flood.findByPk(req.params.id);
        if (!flood) return res.status(404).json({ error: 'Flood record not found' });

        const updatedFlood = await flood.update(req.body);
        res.status(200).json(updatedFlood);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete flood record by ID
const deleteFlood = async (req, res) => {
    try {
        const flood = await Flood.findByPk(req.params.id);
        if (!flood) return res.status(404).json({ error: 'Flood record not found' });

        await flood.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllFloods, getFloodById, createFlood, updateFlood, deleteFlood };
