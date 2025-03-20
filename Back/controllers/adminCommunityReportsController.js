// controllers/adminCommunityReportsController.js
const CommunityReport = require('../models/community_report');
const User = require('../models/user');

// Get all community reports with limited user info
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

// Update the status of a report (e.g., pending, verified, rejected)
const updateReportStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  // Validate the new status
  const allowedStatuses = ['pending', 'verified', 'rejected'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status provided' });
  }
  try {
    const report = await CommunityReport.findByPk(id);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    // Update status
    await report.update({ status });
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a community report
const deleteCommunityReport = async (req, res) => {
  const { id } = req.params;
  try {
    const report = await CommunityReport.findByPk(id);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    await report.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllReports,
  updateReportStatus,
  deleteCommunityReport,
};
