const CommunityReport = require('../models/community_report');
const User = require('../models/user');

// Get all community reports
const getAllReports = async (req, res) => {
  try {
    const reports = await CommunityReport.findAll({ include: User });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get report by ID
const getReportById = async (req, res) => {
  try {
    const report = await CommunityReport.findByPk(req.params.id, { include: User });
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new community report
const createReport = async (req, res) => {
  const { report_type, location, description, image_url, status, user_id } = req.body;
  try {
    const newReport = await CommunityReport.create({
      report_type,
      location,
      description,
      image_url,
      status,
      user_id
    });
    res.status(201).json(newReport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a report by ID
const updateReport = async (req, res) => {
  try {
    const report = await CommunityReport.findByPk(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    
    const updatedReport = await report.update(req.body);
    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a report by ID
const deleteReport = async (req, res) => {
  try {
    const report = await CommunityReport.findByPk(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    
    await report.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllReports, getReportById, createReport, updateReport, deleteReport };
