const express = require('express');
const router = express.Router();
const { getAllHighRiskAreas, getHighRiskAreaById, createHighRiskArea, updateHighRiskArea, deleteHighRiskArea } = require('../controllers/highRiskController');

/**
 * @swagger
 * tags:
 *   name: HighRiskAreas
 *   description: High-risk area management
 */

/**
 * @swagger
 * /high-risk-areas:
 *   get:
 *     summary: Get all high-risk areas
 *     tags: [HighRiskAreas]
 *     responses:
 *       200:
 *         description: A list of high-risk areas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   area_id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Nairobi Flood Zone"
 *                   description:
 *                     type: string
 *                     example: "High-risk flooding zone near Nairobi river."
 *                   coordinates:
 *                     type: string
 *                     example: "1.2921 S, 36.8219 E"
 */
router.get('/', getAllHighRiskAreas);

/**
 * @swagger
 * /high-risk-areas/{id}:
 *   get:
 *     summary: Get a high-risk area by ID
 *     tags: [HighRiskAreas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Area ID
 *     responses:
 *       200:
 *         description: A high-risk area object
 *       404:
 *         description: Area not found
 */
router.get('/:id', getHighRiskAreaById);

/**
 * @swagger
 * /high-risk-areas:
 *   post:
 *     summary: Create a new high-risk area
 *     tags: [HighRiskAreas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nairobi Flood Zone"
 *               description:
 *                 type: string
 *                 example: "High-risk flooding zone near Nairobi river."
 *               coordinates:
 *                 type: string
 *                 example: "1.2921 S, 36.8219 E"
 *     responses:
 *       201:
 *         description: Area created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', createHighRiskArea);

/**
 * @swagger
 * /high-risk-areas/{id}:
 *   put:
 *     summary: Update a high-risk area by ID
 *     tags: [HighRiskAreas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Area ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Nairobi Flood Zone"
 *               description:
 *                 type: string
 *                 example: "Updated description for high-risk flooding zone."
 *               coordinates:
 *                 type: string
 *                 example: "1.2921 S, 36.8219 E"
 *     responses:
 *       200:
 *         description: Area updated successfully
 *       404:
 *         description: Area not found
 */
router.put('/:id', updateHighRiskArea);

/**
 * @swagger
 * /high-risk-areas/{id}:
 *   delete:
 *     summary: Delete a high-risk area by ID
 *     tags: [HighRiskAreas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Area ID
 *     responses:
 *       204:
 *         description: Area deleted successfully
 *       404:
 *         description: Area not found
 */
router.delete('/:id', deleteHighRiskArea);

module.exports = router;
