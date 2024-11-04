const HighRiskArea = require('../models/high_risk_area');

// Get all high-risk areas
const getAllHighRiskAreas = async (req, res) => {
  try {
    const areas = await HighRiskArea.findAll();
    res.status(200).json(areas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get high-risk area by ID
const getHighRiskAreaById = async (req, res) => {
  try {
    const area = await HighRiskArea.findByPk(req.params.id);
    if (!area) return res.status(404).json({ error: 'Area not found' });
    res.status(200).json(area);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new high-risk area
const createHighRiskArea = async (req, res) => {
  const { name, description, coordinates } = req.body;
  try {
    const newArea = await HighRiskArea.create({ name, description, coordinates });
    res.status(201).json(newArea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a high-risk area by ID
const updateHighRiskArea = async (req, res) => {
  try {
    const area = await HighRiskArea.findByPk(req.params.id);
    if (!area) return res.status(404).json({ error: 'Area not found' });
    
    const updatedArea = await area.update(req.body);
    res.status(200).json(updatedArea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a high-risk area by ID
const deleteHighRiskArea = async (req, res) => {
  try {
    const area = await HighRiskArea.findByPk(req.params.id);
    if (!area) return res.status(404).json({ error: 'Area not found' });
    
    await area.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllHighRiskAreas, getHighRiskAreaById, createHighRiskArea, updateHighRiskArea, deleteHighRiskArea };
