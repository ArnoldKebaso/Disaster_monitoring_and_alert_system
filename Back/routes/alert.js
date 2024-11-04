const express = require('express');
const router = express.Router();
const { getAllAlerts, getAlertById, createAlert, updateAlert, deleteAlert } = require('../controllers/alertController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Alerts
 *   description: Alert management
 */

/**
 * @swagger
 * /alerts:
 *   get:
 *     summary: Get all alerts
 *     tags: [Alerts]
 *     responses:
 *       200:
 *         description: A list of alerts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   alert_id:
 *                     type: integer
 *                     example: 1
 *                   alert_type:
 *                     type: string
 *                     example: "Flood"
 *                   severity:
 *                     type: string
 *                     example: "High"
 *                   location:
 *                     type: string
 *                     example: "Nairobi"
 *                   description:
 *                     type: string
 *                     example: "Flood warning for Nairobi."
 *                   status:
 *                     type: string
 *                     example: "active"
 */
router.get('/', getAllAlerts);

/**
 * @swagger
 * /alerts/{id}:
 *   get:
 *     summary: Get an alert by ID
 *     tags: [Alerts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Alert ID
 *     responses:
 *       200:
 *         description: An alert object
 *       404:
 *         description: Alert not found
 */
router.get('/:id', getAlertById);

/**
 * @swagger
 * /alerts:
 *   post:
 *     summary: Create a new alert
 *     tags: [Alerts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - alert_type
 *               - severity
 *               - location
 *             properties:
 *               alert_type:
 *                 type: string
 *                 enum: [Flood, Earthquake, Wildfire, Tsunami, Tornado]
 *                 example: "Flood"
 *               severity:
 *                 type: string
 *                 enum: [Low, Medium, High]
 *                 example: "High"
 *               location:
 *                 type: string
 *                 example: "Nairobi"
 *               description:
 *                 type: string
 *                 example: "Flood warning for Nairobi."
 *               status:
 *                 type: string
 *                 enum: [active, resolved]
 *                 example: "active"
 *     responses:
 *       201:
 *         description: Alert created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', createAlert);

/**
 * @swagger
 * /alerts/{id}:
 *   put:
 *     summary: Update an alert by ID
 *     tags: [Alerts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Alert ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alert_type:
 *                 type: string
 *                 enum: [Flood, Earthquake, Wildfire, Tsunami, Tornado]
 *                 example: "Flood"
 *               severity:
 *                 type: string
 *                 enum: [Low, Medium, High]
 *                 example: "High"
 *               location:
 *                 type: string
 *                 example: "Nairobi"
 *               description:
 *                 type: string
 *                 example: "Updated flood warning."
 *               status:
 *                 type: string
 *                 enum: [active, resolved]
 *                 example: "resolved"
 *     responses:
 *       200:
 *         description: Alert updated successfully
 *       404:
 *         description: Alert not found
 */
router.put('/:id', updateAlert);

/**
 * @swagger
 * /alerts/{id}:
 *   delete:
 *     summary: Delete an alert by ID
 *     tags: [Alerts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Alert ID
 *     responses:
 *       204:
 *         description: Alert deleted successfully
 *       404:
 *         description: Alert not found
 */
router.delete('/:id', deleteAlert);

module.exports = router;
