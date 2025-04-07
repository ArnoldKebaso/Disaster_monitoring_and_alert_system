const express = require('express');
const {
    subscribeUser,
    getAllSubscriptions,
    updateSubscription,
    deleteSubscription,
    getSubscriptionsByLocation,
    sendEmailAlert,
    getSubscriptionLocationCounts,
    getSubscriptionMethodCounts,
    getSubscriptionsByMonth,    
} = require("../controllers/subscriptionController.js");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: Alert subscription management endpoints
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       required:
 *         - method
 *         - contact
 *         - locations
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         method:
 *           type: string
 *           enum: [email, sms, push]
 *           example: "email"
 *         contact:
 *           type: string
 *           example: "user@example.com"
 *         locations:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Nairobi", "Mombasa"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T12:30:00Z"
 *     AlertRequest:
 *       type: object
 *       required:
 *         - to
 *         - subject
 *         - text
 *         - alertType
 *         - location
 *       properties:
 *         to:
 *           type: string
 *           format: email
 *           example: "user@example.com"
 *         subject:
 *           type: string
 *           example: "Flood Alert"
 *         text:
 *           type: string
 *           example: "Severe flooding reported in your area"
 *         alertType:
 *           type: string
 *           example: "flood"
 *         location:
 *           type: string
 *           example: "Nairobi"
 *         description:
 *           type: string
 *         severity:
 *           type: string
 *         water_levels:
 *           type: object
 *         evacuation_routes:
 *           type: array
 *           items: string
 *         emergency_contacts:
 *           type: array
 *           items: string
 *         precautionary_measures:
 *           type: array
 *           items: string
 *         weather_forecast:
 *           type: object
 *     MethodCount:
 *       type: object
 *       properties:
 *         label:
 *           type: string
 *           example: "email"
 *         count:
 *           type: integer
 *           example: 15
 *     LocationCount:
 *       type: object
 *       properties:
 *         label:
 *           type: string
 *           example: "Nairobi"
 *         count:
 *           type: integer
 *           example: 8
 */

/**
 * @swagger
 * /subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     tags: [Subscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
router.post("/", subscribeUser);

/**
 * @swagger
 * /subscriptions:
 *   get:
 *     summary: Get all subscriptions
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: List of subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 *       500:
 *         description: Server error
 */
router.get("/", getAllSubscriptions);

/**
 * @swagger
 * /subscriptions/{id}:
 *   put:
 *     summary: Update a subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Subscription ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       200:
 *         description: Updated subscription
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateSubscription);

/**
 * @swagger
 * /subscriptions/by-location:
 *   get:
 *     summary: Get subscriptions by location
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter subscriptions by location
 *     responses:
 *       200:
 *         description: Subscription data
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   additionalProperties:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Subscription'
 *                 - type: array
 *                   items:
 *                     $ref: '#/components/schemas/Subscription'
 *       500:
 *         description: Server error
 */
router.get('/by-location', getSubscriptionsByLocation);

/**
 * @swagger
 * /subscriptions/{id}:
 *   delete:
 *     summary: Delete a subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Subscription ID
 *     responses:
 *       204:
 *         description: Subscription deleted
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteSubscription);

/**
 * @swagger
 * /subscriptions/send-email:
 *   post:
 *     summary: Send email alert
 *     tags: [Subscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlertRequest'
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       500:
 *         description: Failed to send email
 */
router.post('/send-email', sendEmailAlert);

/**
 * @swagger
 * /subscriptions/analytics/method-counts:
 *   get:
 *     summary: Get subscription method analytics
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: Method distribution data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MethodCount'
 *       500:
 *         description: Server error
 */
router.get('/analytics/method-counts', getSubscriptionMethodCounts);

/**
 * @swagger
 * /subscriptions/analytics/location-counts:
 *   get:
 *     summary: Get subscription location analytics
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: Location distribution data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LocationCount'
 *       500:
 *         description: Server error
 */
router.get('/analytics/location-counts', getSubscriptionLocationCounts);

/**
 * @swagger
 * /subscriptions/filter/month:
 *   get:
 *     summary: Filter subscriptions by month
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         required: true
 *     responses:
 *       200:
 *         description: Filtered subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Invalid year/month parameters
 *       500:
 *         description: Server error
 */
router.get('/filter/month', getSubscriptionsByMonth);

module.exports = router;