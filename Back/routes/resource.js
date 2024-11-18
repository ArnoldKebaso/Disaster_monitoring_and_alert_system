const express = require('express');
const router = express.Router();
const { getAllResources, getResourceById, createResource, updateResource, deleteResource } = require('../controllers/resourceController');

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: Resource management
 */

/**
 * @swagger
 * /resources:
 *   get:
 *     summary: Get all resources
 *     tags: [Resources]
 *     responses:
 *       200:
 *         description: A list of resources
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
 *                     example: "Water"
 *                   quantity:
 *                     type: string
 *                     example: "500 liters"
 *                   availability_status:
 *                     type: string
 *                     example: "Available"
 */
router.get('/', getAllResources);

/**
 * @swagger
 * /resources/{id}:
 *   get:
 *     summary: Get resource data by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Resource ID
 *     responses:
 *       200:
 *         description: A resource object
 *       404:
 *         description: Resource not found
 */
router.get('/:id', getResourceById);

/**
 * @swagger
 * /resources:
 *   post:
 *     summary: Create a new resource entry
 *     tags: [Resources]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - quantity
 *             properties:
 *               type:
 *                 type: string
 *                 example: "Water"
 *               quantity:
 *                 type: string
 *                 example: "500 liters"
 *               availability_status:
 *                 type: string
 *                 example: "Available"
 *     responses:
 *       201:
 *         description: Resource created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', createResource);

/**
 * @swagger
 * /resources/{id}:
 *   put:
 *     summary: Update resource data by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Resource ID
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
 *               quantity:
 *                 type: string
 *                 example: "Updated quantity"
 *               availability_status:
 *                 type: string
 *                 example: "Updated status"
 *     responses:
 *       200:
 *         description: Resource updated successfully
 *       404:
 *         description: Resource not found
 */
router.put('/:id', updateResource);

/**
 * @swagger
 * /resources/{id}:
 *   delete:
 *     summary: Delete a resource entry by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Resource ID
 *     responses:
 *       204:
 *         description: Resource deleted successfully
 *       404:
 *         description: Resource not found
 */
router.delete('/:id', deleteResource);

module.exports = router;
