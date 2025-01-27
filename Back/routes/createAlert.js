const express = require('express');
const router = express.Router();
const { createAlert } = require('../controllers/createAlertController');

/**
 * @swagger
 * tags:
 *   name: Alerts
 *   description: Manage alerts
 */

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
 *                 enum: [FlashFlood, RiverFlood, CoastalFlood, UrbanFlood, ElNinoFlooding]
 *                 example: "FlashFlood"
 *               severity:
 *                 type: string
 *                 enum: [Low, Medium, High]
 *                 example: "High"
 *               location:
 *                 type: string
 *                 example: "Budalangi"
 *               description:
 *                 type: string
 *                 example: "Sudden flash flood reported in the region."
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

module.exports = router;
