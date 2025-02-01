const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");

/**
 * @swagger
 * /subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     description: Subscribes a user to alerts with email/SMS and selected locations.
 *     parameters:
 *       - in: body
 *         name: subscription
 *         description: Subscription details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             method:
 *               type: string
 *               example: "email"
 *             contact:
 *               type: string
 *               example: "user@example.com"
 *             locations:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["Budalangi Central", "Sio Port"]
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *       400:
 *         description: Bad request, missing fields
 */
router.post("/", subscriptionController.createSubscription);

/**
 * @swagger
 * /subscriptions:
 *   get:
 *     summary: Get all subscriptions
 *     responses:
 *       200:
 *         description: List of all subscriptions
 */
router.get("/", subscriptionController.getAllSubscriptions);

/**
 * @swagger
 * /subscriptions/{id}:
 *   get:
 *     summary: Get a subscription by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Subscription ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Subscription details
 *       404:
 *         description: Subscription not found
 */
router.get("/:id", subscriptionController.getSubscriptionById);

/**
 * @swagger
 * /subscriptions/{id}:
 *   put:
 *     summary: Update a subscription
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Subscription ID
 *         schema:
 *           type: integer
 *       - in: body
 *         name: subscription
 *         description: Updated subscription details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             method:
 *               type: string
 *             contact:
 *               type: string
 *             locations:
 *               type: array
 *               items:
 *                 type: string
 *     responses:
 *       200:
 *         description: Subscription updated successfully
 *       404:
 *         description: Subscription not found
 */
router.put("/:id", subscriptionController.updateSubscription);

/**
 * @swagger
 * /subscriptions/{id}:
 *   delete:
 *     summary: Delete a subscription
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Subscription ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Subscription deleted successfully
 *       404:
 *         description: Subscription not found
 */
router.delete("/:id", subscriptionController.deleteSubscription);

module.exports = router;
