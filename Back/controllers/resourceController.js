const Resource = require('../models/resource');

// Get all resources
const getAllResources = async (req, res) => {
    try {
        const resources = await Resource.findAll();
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get resource by ID
const getResourceById = async (req, res) => {
    try {
        const resource = await Resource.findByPk(req.params.id);
        if (!resource) return res.status(404).json({ error: 'Resource not found' });
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new resource
const createResource = async (req, res) => {
    const { type, quantity, location, last_updated } = req.body;
    try {
        const newResource = await Resource.create({ type, quantity, location, last_updated });
        res.status(201).json(newResource);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update resource by ID
const updateResource = async (req, res) => {
    try {
        const resource = await Resource.findByPk(req.params.id);
        if (!resource) return res.status(404).json({ error: 'Resource not found' });

        const updatedResource = await resource.update(req.body);
        res.status(200).json(updatedResource);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete resource by ID
const deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findByPk(req.params.id);
        if (!resource) return res.status(404).json({ error: 'Resource not found' });

        await resource.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllResources, getResourceById, createResource, updateResource, deleteResource };
