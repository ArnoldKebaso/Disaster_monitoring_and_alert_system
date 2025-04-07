const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  getAllReports,
  updateReportStatus,
  deleteCommunityReport,
} = require('../controllers/adminCommunityReportsController');

/**
 * @swagger
 * tags:
 *   name: Admin Community Reports
 *   description: Admin management of flood reports submitted by community members
 */

/**
 * @swagger
 * /admin/community-reports:
 *   get:
 *     summary: Get all community flood reports
 *     tags: [Admin Community Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, verified, rejected]
 *         description: Filter reports by status
 *       - in: query
 *         name: report_type
 *         schema:
 *           type: string
 *           enum: [FlashFlood, RiverFlood, CoastalFlood, UrbanFlood, ElNinoFlooding]
 *         description: Filter by specific flood type
 *     responses:
 *       200:
 *         description: List of flood reports with user details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CommunityReport'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - User is not authorized
 *       500:
 *         description: Server error
 */
router.get('/', authMiddleware, getAllReports);

/**
 * @swagger
 * /admin/community-reports/{id}/status:
 *   put:
 *     summary: Update verification status of a flood report
 *     tags: [Admin Community Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the report to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, verified, rejected]
 *                 example: "verified"
 *     responses:
 *       200:
 *         description: Report status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommunityReport'
 *       400:
 *         description: Invalid status value
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Report not found
 *       500:
 *         description: Server error
 */
router.put('/:id/status', authMiddleware, updateReportStatus);

/**
 * @swagger
 * /admin/community-reports/{id}:
 *   delete:
 *     summary: Delete a flood report
 *     tags: [Admin Community Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the report to delete
 *     responses:
 *       204:
 *         description: Report deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Report not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authMiddleware, deleteCommunityReport);

/**
 * @swagger
 * components:
 *   schemas:
 *     CommunityReport:
 *       type: object
 *       properties:
 *         report_id:
 *           type: integer
 *           example: 123
 *         report_type:
 *           type: string
 *           enum: [FlashFlood, RiverFlood, CoastalFlood, UrbanFlood, ElNinoFlooding]
 *           example: "UrbanFlood"
 *         location:
 *           type: string
 *           example: "Main Street, Downtown"
 *         description:
 *           type: string
 *           example: "Severe flooding causing road closures"
 *         image_url:
 *           type: string
 *           format: uri
 *           example: "https://example.com/flood-image.jpg"
 *         status:
 *           type: string
 *           enum: [pending, verified, rejected]
 *           example: "verified"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T12:30:00Z"
 *         user_id:
 *           type: integer
 *           example: 456
 *         User:
 *           $ref: '#/components/schemas/ReportUser'
 * 
 *     ReportUser:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *           example: 456
 *         username:
 *           type: string
 *           example: "flood_watcher_123"
 *         email:
 *           type: string
 *           format: email
 *           example: "user@example.com"
 *         phone:
 *           type: string
 *           example: "+1234567890"
 *         location:
 *           type: string
 *           example: "Downtown Area"
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

module.exports = router;// // routes/adminCommunityReports.js



// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middleware/auth');
// const {
//   getAllReports,
//   updateReportStatus,
//   deleteCommunityReport,
// } = require('../controllers/adminCommunityReportsController');

// // All routes here require authentication (and ideally admin checks)
// router.get('/', authMiddleware, getAllReports);
// router.put('/:id/status', authMiddleware, updateReportStatus);
// router.delete('/:id', authMiddleware, deleteCommunityReport);

// module.exports = router;
