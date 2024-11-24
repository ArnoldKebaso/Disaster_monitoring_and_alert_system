const express = require('express');
const router = express.Router();
// const { getAllDemographics, getDemographicById, createDemographic, updateDemographic, deleteDemographic } = require('../controllers/demographicsController');
const {
    getAllDemographics,
    getDemographicsById,
    createDemographics,
    updateDemographics,
    deleteDemographics,
} = require('../controllers/demographicsController');

/**
 * @swagger
 * tags:
 *   name: Demographics
 *   description: Demographic management
 */

/**
 * @swagger
 * /demographics:
 *   get:
 *     summary: Get all demographics
 *     tags: [Demographics]
 *     responses:
 *       200:
 *         description: A list of demographics
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
 *                   population_density:
 *                     type: number
 *                     example: 5000
 *                   age_distribution:
 *                     type: string
 *                     example: "20% youth, 50% adults, 30% elderly"
 *                   location:
 *                     type: string
 *                     example: "Nairobi"
 */
router.get('/', getAllDemographics);

/**
 * @swagger
 * /demographics/{id}:
 *   get:
 *     summary: Get demographic data by ID
 *     tags: [Demographics]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Demographic ID
 *     responses:
 *       200:
 *         description: A demographic object
 *       404:
 *         description: Demographic not found
 */
router.get('/:id', getDemographicsById);

/**
 * @swagger
 * /demographics:
 *   post:
 *     summary: Create a new demographic entry
 *     tags: [Demographics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - population_density
 *               - location
 *             properties:
 *               population_density:
 *                 type: number
 *                 example: 5000
 *               age_distribution:
 *                 type: string
 *                 example: "20% youth, 50% adults, 30% elderly"
 *               location:
 *                 type: string
 *                 example: "Nairobi"
 *     responses:
 *       201:
 *         description: Demographic created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', createDemographics);

/**
 * @swagger
 * /demographics/{id}:
 *   put:
 *     summary: Update demographic data by ID
 *     tags: [Demographics]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Demographic ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               population_density:
 *                 type: number
 *                 example: 5200
 *               age_distribution:
 *                 type: string
 *                 example: "Updated age distribution"
 *               location:
 *                 type: string
 *                 example: "Nairobi"
 *     responses:
 *       200:
 *         description: Demographic updated successfully
 *       404:
 *         description: Demographic not found
 */
router.put('/:id', updateDemographics);



/**
 * @swagger
 * /demographics/{id}:
 *   delete:
 *     summary: Delete a demographic entry by ID
 *     tags: [Demographics]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Demographic ID
 *     responses:
 *       204:
 *         description: Demographic deleted successfully
 *       404:
 *         description: Demographic not found
 */
router.delete('/:id', deleteDemographics);

module.exports = router;
