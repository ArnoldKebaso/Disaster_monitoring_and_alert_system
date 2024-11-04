const express = require('express');
const router = express.Router();
const { getAllSafeRoutes, getSafeRouteById, createSafeRoute, updateSafeRoute, deleteSafeRoute } = require('../controllers/safeRouteController');

/**
 * @swagger
 * tags:
 *   name: SafeRoutes
 *   description: Safe routes management
 */

/**
 * @swagger
 * /safe-routes:
 *   get:
 *     summary: Get all safe routes
 *     tags: [SafeRoutes]
 *     responses:
 *       200:
 *         description: A list of safe routes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   route_id:
 *                     type: integer
 *                     example: 1
 *                   start_location:
 *                     type: string
 *                     example: "Downtown"
 *                   end_location:
 *                     type: string
 *                     example: "Northside Shelter"
 *                   description:
 *                     type: string
 *                     example: "This route avoids flood-prone areas."
 */
router.get('/', getAllSafeRoutes);

/**
 * @swagger
 * /safe-routes/{id}:
 *   get:
 *     summary: Get a safe route by ID
 *     tags: [SafeRoutes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Route ID
 *     responses:
 *       200:
 *         description: A safe route object
 *       404:
 *         description: Route not found
 */
router.get('/:id', getSafeRouteById);

/**
 * @swagger
 * /safe-routes:
 *   post:
 *     summary: Create a new safe route
 *     tags: [SafeRoutes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - start_location
 *               - end_location
 *             properties:
 *               start_location:
 *                 type: string
 *                 example: "Downtown"
 *               end_location:
 *                 type: string
 *                 example: "Northside Shelter"
 *               description:
 *                 type: string
 *                 example: "This route avoids flood-prone areas."
 *     responses:
 *       201:
 *         description: Route created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', createSafeRoute);

/**
 * @swagger
 * /safe-routes/{id}:
 *   put:
 *     summary: Update a safe route by ID
 *     tags: [SafeRoutes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Route ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_location:
 *                 type: string
 *                 example: "Updated Start"
 *               end_location:
 *                 type: string
 *                 example: "Updated End"
 *               description:
 *                 type: string
 *                 example: "Updated route avoiding risk zones."
 *     responses:
 *       200:
 *         description: Route updated successfully
 *       404:
 *         description: Route not found
 */
router.put('/:id', updateSafeRoute);

/**
 * @swagger
 * /safe-routes/{id}:
 *   delete:
 *     summary: Delete a safe route by ID
 *     tags: [SafeRoutes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Route ID
 *     responses:
 *       204:
 *         description: Route deleted successfully
 *       404:
 *         description: Route not found
 */
router.delete('/:id', deleteSafeRoute);

module.exports = router;
