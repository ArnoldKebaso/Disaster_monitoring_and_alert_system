const express = require('express');
const router = express.Router();
const { sendSmsAlert } = require('../controllers/smsController');

// Send SMS Alert
router.post('/send-sms', sendSmsAlert);

module.exports = router;