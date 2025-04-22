// Import required modules and initialize Express app
var express = require('express')
var cors = require('cors')
var app = express()
const sequelize = require('../config/database');
const { Op } = require('sequelize');

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(cors({
  origin: 'http://localhost:3001', // Allow requests from frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Import models
const CommunityReport = require('../models/community_report');
const User = require('../models/user');

// Get all community reports with associated user details
const getAllReports = async (req, res) => {
  try {
    const reports = await CommunityReport.findAll({
      include: [{
        model: User,
        attributes: ['user_id', 'username', 'email', 'phone', 'location'] // Include specific user fields
      }]
    });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific report by its ID
const getReportById = async (req, res) => {
  try {
    const report = await CommunityReport.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ['user_id', 'username', 'email', 'phone', 'location'] // Include specific user fields
      }]
    });
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new report, associating it with the authenticated user
const createReport = async (req, res) => {
  // Get user ID from authentication middleware
  const userId = req.user.id;

  // Extract fields from the request body
  const { report_type, location, description, status } = req.body;
  
  // Check if a file was uploaded using Multer
  let imageUrl = null;
  if (req.file) {
    imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  }

  try {
    // Include user_id from authenticated user
    const newReport = await CommunityReport.create({
      report_type,
      location,
      description,
      image_url: imageUrl,
      status,
      user_id: userId  // Add this line
    });
    
    res.status(201).json(newReport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing report by its ID
const updateReport = async (req, res) => {
  try {
    const report = await CommunityReport.findByPk(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    const updatedReport = await report.update(req.body); // Update report with request body
    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a report by its ID
const deleteReport = async (req, res) => {
  try {
    const report = await CommunityReport.findByPk(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    await report.destroy(); // Delete the report
    res.status(204).send(); // Send no content response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get reports created within a specific month and year
const getReportsByMonth = async (req, res) => {
  try {
    const { year, month } = req.query;

    // Validate inputs
    if (!year || !month) {
      return res.status(400).json({ error: 'Year and month parameters are required' });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const reports = await CommunityReport.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate] // Filter reports by date range
        }
      },
      include: [{
        model: User,
        attributes: ['user_id', 'username', 'email'] // Include specific user fields
      }],
      attributes: {
        exclude: ['updatedAt'], // Exclude updatedAt field
        include: [
          [sequelize.fn('DATE_FORMAT', sequelize.col('CommunityReport.createdAt'), '%Y-%m-%d'), 'formatted_date'] // Format createdAt
        ]
      }
    });

    res.status(200).json(reports);
  } catch (error) {
    console.error('Error in getReportsByMonth:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get the most frequent report types
const getFrequentReportTypes = async (req, res) => {
  try {
    const frequentTypes = await CommunityReport.findAll({
      attributes: [
        'report_type',
        [sequelize.fn('COUNT', sequelize.col('report_id')), 'count'] // Count occurrences of each report type
      ],
      group: ['report_type'], // Group by report type
      order: [[sequelize.literal('count'), 'DESC']], // Order by count in descending order
      limit: 5 // Limit to top 5 report types
    });
    res.status(200).json(frequentTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get the most frequent locations for reports
const getFrequentLocations = async (req, res) => {
  try {
    const frequentLocations = await CommunityReport.findAll({
      attributes: [
        'location',
        [sequelize.fn('COUNT', sequelize.col('report_id')), 'count'] // Count occurrences of each location
      ],
      group: ['location'], // Group by location
      order: [[sequelize.literal('count'), 'DESC']] // Order by count in descending order
    });
    res.status(200).json(frequentLocations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all reports for a specific location
const getReportsByLocation = async (req, res) => {
  try {
    const { location } = req.query; // Extract location from query parameters
    const reports = await CommunityReport.findAll({
      where: { location }, // Filter reports by location
      include: User // Include associated user details
    });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all controller functions
module.exports = { getAllReports, getReportById, createReport, updateReport, deleteReport, getReportsByMonth, getFrequentReportTypes, getFrequentLocations, getReportsByLocation };
