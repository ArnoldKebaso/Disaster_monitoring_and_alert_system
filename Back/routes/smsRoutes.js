const express = require('express');
const { sendSmsAlert } = require('../controllers/smsController');

const router = express.Router();

// Send SMS Alert
router.post('/send-sms', sendSmsAlert);

module.exports = router;