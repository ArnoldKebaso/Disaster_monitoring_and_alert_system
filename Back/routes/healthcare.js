const express = require('express');
const router = express.Router();
const { getAllHealthcareFacilities, getHealthcareById, createHealthcareFacility, updateHealthcareFacility, deleteHealthcareFacility } = require('../controllers/healthcareController');

/**
 * @swagger
 * tags:
 *   name: HealthcareFacilities
 *   description: Healthcare facility management
 */

/**
 * @swagger
 * /healthcare-facilities:
 *   get:
 *     summary: Get all healthcare facilities
 *     tags: [HealthcareFacilities]
 *     responses:
 *       200:
 *         description: A list of healthcare facilities
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
 *                     example: "City Hospital"
 *                   location:
 *                     type: string
 *                     example: "Nairobi"
 *                   services:
 *                     type: string
 *                     example: "Emergency, Pediatrics, Surgery"
 */
router.get('/', getAllHealthcareFacilities);

/**
 * @swagger
 * /healthcare-facilities/{id}:
 *   get:
 *     summary: Get healthcare facility data by ID
 *     tags: [HealthcareFacilities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Healthcare facility ID
 *     responses:
 *       200:
 *         description: A healthcare facility object
 *       404:
 *         description: Healthcare facility not found
 */
router.get('/:id', getHealthcareById);

/**
 * @swagger
 * /healthcare-facilities:
 *   post:
 *     summary: Create a new healthcare facility
 *     tags: [HealthcareFacilities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 example: "City Hospital"
 *               location:
 *                 type: string
 *                 example: "Nairobi"
 *               services:
 *                 type: string
 *                 example: "Emergency, Pediatrics, Surgery"
 *     responses:
 *       201:
 *         description: Healthcare facility created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', createHealthcareFacility);

/**
 * @swagger
 * /healthcare-facilities/{id}:
 *   put:
 *     summary: Update healthcare facility data by ID
 *     tags: [HealthcareFacilities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Healthcare facility ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Hospital Name"
 *               location:
 *                 type: string
 *                 example: "Updated location"
 *               services:
 *                 type: string
 *                 example: "Updated services"
 *     responses:
 *       200:
 *         description: Healthcare facility updated successfully
 *       404:
 *         description: Healthcare facility not found
 */
router.put('/:id', updateHealthcareFacility);

/**
 * @swagger
 * /healthcare-facilities/{id}:
 *   delete:
 *     summary: Delete a healthcare facility entry by ID
 *     tags: [HealthcareFacilities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Healthcare facility ID
 *     responses:
 *       204:
 *         description: Healthcare facility deleted successfully
 *       404:
 *         description: Healthcare facility not found
 */
router.delete('/:id', deleteHealthcareFacility);

module.exports = router;
