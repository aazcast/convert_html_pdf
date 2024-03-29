const express = require('express');
const router = express.Router();
const Functions = require('../controllers/functions');

router.post('/functions/pdf', Functions.createPdf);

module.exports = router;
