const express = require('express');
const { health } = require('../controllers/healthController');

const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 */
router.get('/health', health);

module.exports = router;
