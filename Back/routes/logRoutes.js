const express = require('express');
const { createLog, getAllLogs } = require("../controllers/log.js");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Log management
 */

/**
 * @swagger
 * /logs:
 *   post:
 *     summary: Create a new log
 *     tags: [Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - method
 *               - contact
 *               - alertType
 *               - location
 *               - timeSent
 *               - status
 *             properties:
 *               method:
 *                 type: string
 *                 example: "email"
 *               contact:
 *                 type: string
 *                 example: "user@example.com"
 *               alertType:
 *                 type: string
 *                 example: "Flood"
 *               location:
 *                 type: string
 *                 example: "Location1"
 *               timeSent:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-10-01T12:00:00Z"
 *               status:
 *                 type: string
 *                 example: "success"
 *     responses:
 *       201:
 *         description: Log created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/", createLog);

/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Get all logs
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: A list of logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   method:
 *                     type: string
 *                     example: "email"
 *                   contact:
 *                     type: string
 *                     example: "user@example.com"
 *                   alertType:
 *                     type: string
 *                     example: "Flood"
 *                   location:
 *                     type: string
 *                     example: "Location1"
 *                   timeSent:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-10-01T12:00:00Z"
 *                   status:
 *                     type: string
 *                     example: "success"
 *       500:
 *         description: Internal server error
 */
router.get("/", getAllLogs);

module.exports = router;

