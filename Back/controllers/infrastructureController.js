const Infrastructure = require('../models/infrastructure');

// Get all infrastructure records
const getAllInfrastructure = async (req, res) => {
    try {
        const infrastructure = await Infrastructure.findAll();
        res.status(200).json(infrastructure);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get infrastructure record by ID
const getInfrastructureById = async (req, res) => {
    try {
        const infra = await Infrastructure.findByPk(req.params.id);
        if (!infra) return res.status(404).json({ error: 'Infrastructure record not found' });
        res.status(200).json(infra);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new infrastructure record
const createInfrastructure = async (req, res) => {
    const { road_name, status, last_checked, alternate_routes } = req.body;
    try {
        const newInfra = await Infrastructure.create({ road_name, status, last_checked, alternate_routes });
        res.status(201).json(newInfra);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update infrastructure record by ID
const updateInfrastructure = async (req, res) => {
    try {
        const infra = await Infrastructure.findByPk(req.params.id);
        if (!infra) return res.status(404).json({ error: 'Infrastructure record not found' });

        const updatedInfra = await infra.update(req.body);
        res.status(200).json(updatedInfra);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete infrastructure record by ID
const deleteInfrastructure = async (req, res) => {
    try {
        const infra = await Infrastructure.findByPk(req.params.id);
        if (!infra) return res.status(404).json({ error: 'Infrastructure record not found' });

        await infra.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllInfrastructure, getInfrastructureById, createInfrastructure, updateInfrastructure, deleteInfrastructure };
