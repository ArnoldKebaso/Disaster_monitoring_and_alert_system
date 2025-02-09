const express = require('express');
const { body, validationResult } = require('express-validator');
const { createAlert } = require('../controllers/createAlertController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Alerts
 *   description: Manage alerts
 */

/**
 * @swagger
 * /alerts:
 *   post:
 *     summary: Create a new alert
 *     tags: [Alerts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - alert_type
 *               - severity
 *               - location
 *               - water_levels
 *               - evacuation_routes
 *               - emergency_contacts
 *               - precautionary_measures
 *               - weather_forecast
 *             properties:
 *               alert_type:
 *                 type: string
 *                 enum: [FlashFlood, RiverFlood, CoastalFlood, UrbanFlood, ElNinoFlooding]
 *                 example: "FlashFlood"
 *               severity:
 *                 type: string
 *                 enum: [Low, Medium, High]
 *                 example: "High"
 *               location:
 *                 type: string
 *                 example: "Budalangi"
 *               description:
 *                 type: string
 *                 example: "Sudden flash flood reported in the region."
 *               water_levels:
 *                 type: object
 *                 properties:
 *                   current:
 *                     type: string
 *                     example: "4.5 meters"
 *                   predicted:
 *                     type: string
 *                     example: "5.2 meters (in 24 hours)"
 *               evacuation_routes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["From Bunyala to Busia via Budalangi-Busia Road", "From Port Victoria to Busia via Sio Port Road"]
 *               emergency_contacts:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Budalangi Sub-County Office: +254 712 345 678", "Red Cross Kenya: +254 733 123 456"]
 *               precautionary_measures:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Move to higher ground immediately.", "Avoid crossing flooded rivers or roads."]
 *               weather_forecast:
 *                 type: object
 *                 properties:
 *                   next_24_hours:
 *                     type: string
 *                     example: "Heavy rainfall expected, with up to 50mm of precipitation."
 *                   next_48_hours:
 *                     type: string
 *                     example: "Moderate rainfall expected, with up to 30mm of precipitation."
 *               status:
 *                 type: string
 *                 enum: [active, resolved]
 *                 example: "active"
 *     responses:
 *       201:
 *         description: Alert created successfully
 *       400:
 *         description: Bad request
 */

router.post(
    '/',
    [
        body('alert_type').isIn(['FlashFlood', 'RiverFlood', 'CoastalFlood', 'UrbanFlood', 'ElNinoFlooding']),
        body('severity').isIn(['Low', 'Medium', 'High']),
        body('location').notEmpty(),
        body('water_levels').isObject(),
        body('evacuation_routes').isArray(),
        body('emergency_contacts').isArray(),
        body('precautionary_measures').isArray(),
        body('weather_forecast').isObject(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation Errors:', errors.array()); // Log validation errors
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            alert_type,
            severity,
            location,
            description,
            water_levels,
            evacuation_routes,
            emergency_contacts,
            precautionary_measures,
            weather_forecast,
        } = req.body;

        try {
            const newAlert = await Alert.create({
                alert_type,
                severity,
                location,
                description,
                water_levels,
                evacuation_routes,
                emergency_contacts,
                precautionary_measures,
                weather_forecast,
                status: 'active',
            });

            res.status(201).json(newAlert);
        } catch (error) {
            console.error('Database Error:', error); // Log database errors
            res.status(400).json({ error: error.message });
        }
    }
);


// router.post(
//     '/',
//     [
//         body('alert_type').isIn(['FlashFlood', 'RiverFlood', 'CoastalFlood', 'UrbanFlood', 'ElNinoFlooding']),
//         body('severity').isIn(['Low', 'Medium', 'High']),
//         body('location').notEmpty(),
//         body('water_levels').isObject(),
//         body('evacuation_routes').isArray(),
//         body('emergency_contacts').isArray(),
//         body('precautionary_measures').isArray(),
//         body('weather_forecast').isObject(),
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const {
//             alert_type,
//             severity,
//             location,
//             description,
//             water_levels,
//             evacuation_routes,
//             emergency_contacts,
//             precautionary_measures,
//             weather_forecast,
//         } = req.body;

//         try {
//             const newAlert = await Alert.create({
//                 alert_type,
//                 severity,
//                 location,
//                 description,
//                 water_levels,
//                 evacuation_routes,
//                 emergency_contacts,
//                 precautionary_measures,
//                 weather_forecast,
//                 status: 'active',
//             });

//             res.status(201).json(newAlert);
//         } catch (error) {
//             res.status(400).json({ error: error.message });
//         }
//     }
// );

module.exports = router;