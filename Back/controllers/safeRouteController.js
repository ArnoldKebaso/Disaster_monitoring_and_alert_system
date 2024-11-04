const SafeRoute = require('../models/safe_route');

// Get all safe routes
const getAllSafeRoutes = async (req, res) => {
  try {
    const routes = await SafeRoute.findAll();
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get safe route by ID
const getSafeRouteById = async (req, res) => {
  try {
    const route = await SafeRoute.findByPk(req.params.id);
    if (!route) return res.status(404).json({ error: 'Route not found' });
    res.status(200).json(route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new safe route
const createSafeRoute = async (req, res) => {
  const { start_location, end_location, description } = req.body;
  try {
    const newRoute = await SafeRoute.create({ start_location, end_location, description });
    res.status(201).json(newRoute);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a safe route by ID
const updateSafeRoute = async (req, res) => {
  try {
    const route = await SafeRoute.findByPk(req.params.id);
    if (!route) return res.status(404).json({ error: 'Route not found' });
    
    const updatedRoute = await route.update(req.body);
    res.status(200).json(updatedRoute);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a safe route by ID
const deleteSafeRoute = async (req, res) => {
  try {
    const route = await SafeRoute.findByPk(req.params.id);
    if (!route) return res.status(404).json({ error: 'Route not found' });
    
    await route.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllSafeRoutes, getSafeRouteById, createSafeRoute, updateSafeRoute, deleteSafeRoute };
