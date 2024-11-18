const express = require('express');
const router = express.Router();
const { getAllInfrastructures, getInfrastructureById, createInfrastructure, updateInfrastructure, deleteInfrastructure } = require('../controllers/infrastructureController');

/**
 * @swagger
 * tags:
 *   name: Infrastructures
 *   description: Infrastructure management
 */

/**
 * @swagger
 * /infrastructures:
 *   get:
 *     summary: Get all infrastructures
 *     tags: [Infrastructures]
 *     responses:
 *       200:
 *         description: A list of infrastructures
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
 *                   type:
 *                     type: string
 *                     example: "Bridge"
 *                   status:
 *                     type: string
 *                     example: "Operational"
 *                   location:
 *                     type: string
 *                     example: "Nairobi"
 */
router.get('/', getAllInfrastructures);

/**
 * @swagger
 * /infrastructures/{id}:
 *   get:
 *     summary: Get infrastructure data by ID
 *     tags: [Infrastructures]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Infrastructure ID
 *     responses:
 *       200:
 *         description: An infrastructure object
 *       404:
 *         description: Infrastructure not found
 */
router.get('/:id', getInfrastructureById);

/**
 * @swagger
 * /infrastructures:
 *   post:
 *     summary: Create a new infrastructure entry
 *     tags: [Infrastructures]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - location
 *             properties:
 *               type:
 *                 type: string
 *                 example: "Bridge"
 *               status:
 *                 type: string
 *                 example: "Operational"
 *               location:
 *                 type: string
 *                 example: "Nairobi"
 *     responses:
 *       201:
 *         description: Infrastructure created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', createInfrastructure);

/**
 * @swagger
 * /infrastructures/{id}:
 *   put:
 *     summary: Update infrastructure data by ID
 *     tags: [Infrastructures]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Infrastructure ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: "Updated Type"
 *               status:
 *                 type: string
 *                 example: "Updated status"
 *               location:
 *                 type: string
 *                 example: "Updated location"
 *     responses:
 *       200:
 *         description: Infrastructure updated successfully
 *       404:
 *         description: Infrastructure not found
 */
router.put('/:id', updateInfrastructure);

/**
 * @swagger
 * /infrastructures/{id}:
 *   delete:
 *     summary: Delete an infrastructure entry by ID
 *     tags: [Infrastructures]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Infrastructure ID
 *     responses:
 *       204:
 *         description: Infrastructure deleted successfully
 *       404:
 *         description: Infrastructure not found
 */
router.delete('/:id', deleteInfrastructure);

module.exports = router;
