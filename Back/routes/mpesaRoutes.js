const express = require('express');
const { initiateSTKPush } = require('../controllers/mpesaController');

const router = express.Router();

router.post('/stkpush', initiateSTKPush);

module.exports = router;