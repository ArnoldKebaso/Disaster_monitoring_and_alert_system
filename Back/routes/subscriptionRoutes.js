// routes/subscriptionRoutes.js
const express = require('express');
const router = express.Router();
const { createSubscription } = require('../controllers/subscriptionEmailController');

// POST endpoint to subscribe to the newsletter
router.post('/', createSubscription);

module.exports = router;
