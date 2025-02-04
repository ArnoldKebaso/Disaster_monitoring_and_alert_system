const express = require('express');
const {
    subscribeUser,
    getAllSubscriptions,
    updateSubscription,
    deleteSubscription,
    getSubscriptionsByLocation,
    sendEmailAlert,
} = require("../controllers/subscriptionController.js");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: Subscription management
 */

/**
 * @swagger
 * /subscriptions:
 *   post:
 *     summary: Subscribe a user
 *     tags: [Subscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - method
 *               - contact
 *               - locations
 *             properties:
 *               method:
 *                 type: string
 *                 example: "email"
 *               contact:
 *                 type: string
 *                 example: "user@example.com"
 *               locations:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["location1", "location2"]
 *     responses:
 *       201:
 *         description: Subscription successful
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/", subscribeUser); // Fixed: Removed "/subscriptions"

/**
 * @swagger
 * /subscriptions:
 *   get:
 *     summary: Get all subscriptions
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: A list of subscriptions
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
 *                   locations:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["location1", "location2"]
 *       500:
 *         description: Internal server error
 */
router.get("/", getAllSubscriptions); // Fixed: Removed "/subscriptions"

/**
 * @swagger
 * /subscriptions/{id}:
 *   put:
 *     summary: Update a subscription by ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The subscription ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               method:
 *                 type: string
 *                 example: "sms"
 *               contact:
 *                 type: string
 *                 example: "user@example.com"
 *               locations:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["location1", "location2"]
 *     responses:
 *       200:
 *         description: Subscription updated successfully
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", updateSubscription); // Fixed: Removed "/subscriptions"

/**
 * @swagger
 * /subscriptions/by-location:
 *   get:
 *     summary: Get subscriptions grouped by location
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: Subscriptions grouped by location
 *       500:
 *         description: Internal server error
 */
router.get('/by-location', getSubscriptionsByLocation); // Fixed: No change needed

/**
 * @swagger
 * /subscriptions/{id}:
 *   delete:
 *     summary: Delete a subscription by ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The subscription ID
 *     responses:
 *       200:
 *         description: Subscription deleted successfully
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", deleteSubscription); 
router.post('/send-email', sendEmailAlert);

module.exports = router;