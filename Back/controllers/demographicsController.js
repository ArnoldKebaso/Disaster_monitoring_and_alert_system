const Demographics = require('../models/demographics');

// Get all demographics data
const getAllDemographics = async (req, res) => {
    try {
        const data = await Demographics.findAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get demographics data by ID
const getDemographicsById = async (req, res) => {
    try {
        const data = await Demographics.findByPk(req.params.id);
        if (!data) return res.status(404).json({ error: 'Demographics data not found' });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new demographics data
const createDemographics = async (req, res) => {
    const { region, population_density, age_distribution, vulnerable_population } = req.body;
    try {
        const newData = await Demographics.create({ region, population_density, age_distribution, vulnerable_population });
        res.status(201).json(newData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update demographics data by ID
const updateDemographics = async (req, res) => {
    try {
        const data = await Demographics.findByPk(req.params.id);
        if (!data) return res.status(404).json({ error: 'Demographics data not found' });

        const updatedData = await data.update(req.body);
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete demographics data by ID
const deleteDemographics = async (req, res) => {
    try {
        const data = await Demographics.findByPk(req.params.id);
        if (!data) return res.status(404).json({ error: 'Demographics data not found' });

        await data.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllDemographics, getDemographicsById, createDemographics, updateDemographics, deleteDemographics };
