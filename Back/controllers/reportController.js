const Report = require('../models/report');

// Fetch all disaster reports
const getReports = async (req, res) => {
    try {
        const reports = await Report.findAll();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reports' });
    }
};

// Add a new disaster report
const createReport = async (req, res) => {
    try {
        const { type, location, description } = req.body;
        const newReport = await Report.create({ type, location, description });
        res.status(201).json(newReport);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create report' });
    }
};

module.exports = { getReports, createReport };
