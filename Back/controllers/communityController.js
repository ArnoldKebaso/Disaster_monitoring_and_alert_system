var express = require('express')
var cors = require('cors')
var app = express()
const sequelize = require('../config/database');
const { Op } = require('sequelize');


app.use(cors()); // This should be placed before any routes
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));


const CommunityReport = require('../models/community_report');
const User = require('../models/user');

// Get all community reports
const getAllReports = async (req, res) => {
  try {
    const reports = await CommunityReport.findAll({
      include: [{
        model: User,
        attributes: ['user_id', 'username', 'email', 'phone', 'location'] 
      }]
    });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get report by ID
const getReportById = async (req, res) => {
  try {
    const report = await CommunityReport.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ['user_id', 'username', 'email', 'phone', 'location']
      }]
    });
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modify createReport controller to include user info from auth
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



// Add these controller functions
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
          [Op.between]: [startDate, endDate]
        }
      },
      include: [{
        model: User,
        attributes: ['user_id', 'username', 'email'] // Only include necessary user fields
      }],
      attributes: {
        exclude: ['updatedAt'], // Remove this if you need updatedAt
        include: [
          // Explicitly specify table for createdAt
          [sequelize.fn('DATE_FORMAT', sequelize.col('CommunityReport.createdAt'), '%Y-%m-%d'), 'formatted_date']
        ]
      }
    });

    res.status(200).json(reports);
  } catch (error) {
    console.error('Error in getReportsByMonth:', error);
    res.status(500).json({ error: error.message });
  }
};
// communityController.js

const getFrequentReportTypes = async (req, res) => {
  try {
    console.log('Attempting to fetch frequent report types...');

    const frequentTypes = await CommunityReport.findAll({
      attributes: [
        'report_type',
        [sequelize.fn('COUNT', sequelize.col('report_id')), 'count']
      ],
      group: ['report_type'],
      order: [[sequelize.literal('count'), 'DESC']],
      limit: 5
    });

    console.log('Frequent types query result:', JSON.stringify(frequentTypes, null, 2));

    res.status(200).json(frequentTypes);
  } catch (error) {
    console.error('Error in getFrequentReportTypes:', error);
    console.error('Full error stack:', error.stack);
    res.status(500).json({
      error: 'Failed to fetch frequent report types',
      details: error.message
    });
  }
};

const getFrequentLocations = async (req, res) => {
  try {
    const frequentLocations = await CommunityReport.findAll({
      attributes: [
        'location',
        [sequelize.fn('COUNT', sequelize.col('report_id')), 'count']
      ],
      group: ['location'],
      order: [[sequelize.literal('count'), 'DESC']],
      // Remove limit to get all locations
    });

    res.status(200).json(frequentLocations);
  } catch (error) {
    console.error('Error in getFrequentLocations:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get reports by location
const getReportsByLocation = async (req, res) => {
  try {
    const { location } = req.query;
    const reports = await CommunityReport.findAll({
      where: { location },
      include: User
    });

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllReports, getReportById, createReport, updateReport, deleteReport, getReportsByMonth, getFrequentReportTypes, getFrequentLocations, getReportsByLocation};
