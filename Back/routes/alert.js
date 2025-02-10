const express = require('express');
const router = express.Router();
const { getAllAlerts, getAlertById, createAlert, updateAlert, deleteAlert } = require('../controllers/alertController');
const authMiddleware = require('../middleware/auth');

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
 *               - alertType
 *               - severity
 *               - location
 *               - description
 *               - water_levels
 *               - evacuation_routes
 *               - emergency_contacts
 *               - precautionary_measures
 *               - weather_forecast
 *               - timeSent
 *               - status
 *             properties:
 *               alertType:
 *                 type: string
 *                 example: "RiverFlood"
 *               severity:
 *                 type: string
 *                 example: "Medium"
 *               location:
 *                 type: string
 *                 example: "Bumadeya"
 *               description:
 *                 type: string
 *                 example: "River Nzoia has overflowed, causing moderate flooding in low-lying areas."
 *               water_levels:
 *                 type: object
 *                 example: { "current": "3.8 meters", "predicted": "4.5 meters (in 24 hours)" }
 *               evacuation_routes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["From Bumadeya to Busia via Budalangi-Busia Road", "From Bumadeya to Port Victoria via Sio Port Road"]
 *               emergency_contacts:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Bumadeya Sub-County Office: +254 712 345 679", "Red Cross Kenya: +254 733 123 457"]
 *               precautionary_measures:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Avoid walking through flooded areas.", "Stay updated via local radio stations."]
 *               weather_forecast:
 *                 type: object
 *                 example: { "next_24_hours": "Light rainfall expected, with up to 20mm of precipitation.", "next_48_hours": "Scattered showers expected, with up to 15mm of precipitation." }
 *               timeSent:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-10-01T12:00:00Z"
 *               status:
 *                 type: string
 *                 example: "active"
 *     responses:
 *       201:
 *         description: Alert created successfully
 *       400:
 *         description: Bad request
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
