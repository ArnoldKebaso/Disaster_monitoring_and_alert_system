const express = require('express');
const router = express.Router();
const { getAllLocations, getLocationById, createLocation, updateLocation, deleteLocation } = require('../controllers/locationController');

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Location management
 */

/**
 * @swagger
 * /locations:
 *   get:
 *     summary: Get all locations
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: A list of locations
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
 *                   name:
 *                     type: string
 *                     example: "Downtown"
 *                   coordinates:
 *                     type: string
 *                     example: "36.8219° E, 1.2921° S"
 */
router.get('/', getAllLocations);

/**
 * @swagger
 * /locations/{id}:
 *   get:
 *     summary: Get location data by ID
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Location ID
 *     responses:
 *       200:
 *         description: A location object
 *       404:
 *         description: Location not found
 */
router.get('/:id', getLocationById);

/**
 * @swagger
 * /locations:
 *   post:
 *     summary: Create a new location entry
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - coordinates
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Downtown"
 *               coordinates:
 *                 type: string
 *                 example: "36.8219° E, 1.2921° S"
 *     responses:
 *       201:
 *         description: Location created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', createLocation);

/**
 * @swagger
 * /locations/{id}:
 *   put:
 *     summary: Update location data by ID
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Location ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Name"
 *               coordinates:
 *                 type: string
 *                 example: "Updated coordinates"
 *     responses:
 *       200:
 *         description: Location updated successfully
 *       404:
 *         description: Location not found
 */
router.put('/:id', updateLocation);

/**
 * @swagger
 * /locations/{id}:
 *   delete:
 *     summary: Delete a location entry by ID
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Location ID
 *     responses:
 *       204:
 *         description: Location deleted successfully
 *       404:
 *         description: Location not found
 */
router.delete('/:id', deleteLocation);

module.exports = router;
