const express = require('express');
const router = express.Router();
const { getAllFloodData, getFloodDataById, createFloodData, updateFloodData, deleteFloodData } = require('../controllers/floodController');

/**
 * @swagger
 * tags:
 *   name: FloodData
 *   description: Flood data management
 */

/**
 * @swagger
 * /flood-data:
 *   get:
 *     summary: Get all flood data
 *     tags: [FloodData]
 *     responses:
 *       200:
 *         description: A list of flood data entries
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
 *                   flood_level:
 *                     type: string
 *                     example: "High"
 *                   affected_areas:
 *                     type: string
 *                     example: "Nairobi, Mombasa"
 *                   report_date:
 *                     type: string
 *                     format: date
 *                     example: "2024-11-18"
 */
router.get('/', getAllFloodData);

/**
 * @swagger
 * /flood-data/{id}:
 *   get:
 *     summary: Get flood data by ID
 *     tags: [FloodData]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Flood data ID
 *     responses:
 *       200:
 *         description: A flood data object
 *       404:
 *         description: Flood data not found
 */
router.get('/:id', getFloodDataById);

/**
 * @swagger
 * /flood-data:
 *   post:
 *     summary: Create a new flood data entry
 *     tags: [FloodData]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - flood_level
 *               - report_date
 *             properties:
 *               flood_level:
 *                 type: string
 *                 example: "High"
 *               affected_areas:
 *                 type: string
 *                 example: "Nairobi, Mombasa"
 *               report_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-11-18"
 *     responses:
 *       201:
 *         description: Flood data created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', createFloodData);

/**
 * @swagger
 * /flood-data/{id}:
 *   put:
 *     summary: Update flood data by ID
 *     tags: [FloodData]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Flood data ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               flood_level:
 *                 type: string
 *                 example: "Updated level"
 *               affected_areas:
 *                 type: string
 *                 example: "Updated areas"
 *               report_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-11-20"
 *     responses:
 *       200:
 *         description: Flood data updated successfully
 *       404:
 *         description: Flood data not found
 */
router.put('/:id', updateFloodData);

/**
 * @swagger
 * /flood-data/{id}:
 *   delete:
 *     summary: Delete a flood data entry by ID
 *     tags: [FloodData]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Flood data ID
 *     responses:
 *       204:
 *         description: Flood data deleted successfully
 *       404:
 *         description: Flood data not found
 */
router.delete('/:id', deleteFloodData);

module.exports = router;
