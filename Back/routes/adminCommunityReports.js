// routes/adminCommunityReports.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  getAllReports,
  updateReportStatus,
  deleteCommunityReport,
} = require('../controllers/adminCommunityReportsController');

// All routes here require authentication (and ideally admin checks)
router.get('/', authMiddleware, getAllReports);
router.put('/:id/status', authMiddleware, updateReportStatus);
router.delete('/:id', authMiddleware, deleteCommunityReport);

module.exports = router;
