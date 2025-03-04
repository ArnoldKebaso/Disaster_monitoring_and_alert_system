const express = require('express');
const { handleUSSD } = require('../controllers/ussdController');

const router = express.Router();
router.post('/ussd', handleUSSD);

module.exports = router;