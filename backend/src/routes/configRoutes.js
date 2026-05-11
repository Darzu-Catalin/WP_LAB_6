const express = require('express');
const {
  listConfigs,
  createConfig,
  getConfigById,
  updateConfig,
  deleteConfig,
} = require('../controllers/configController');
const { authenticateToken, checkPermission } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /configs:
 *   get:
 *     summary: Get all configurations
 *     tags: [Configurations]
 *     security:
 *       - bearerAuth: []
 *   post:
 *     summary: Create a new configuration
 *     tags: [Configurations]
 *     security:
 *       - bearerAuth: []
 */
router.get('/configs', authenticateToken, checkPermission('READ'), listConfigs);
router.post('/configs', authenticateToken, checkPermission('WRITE'), createConfig);

/**
 * @swagger
 * /configs/{id}:
 *   get:
 *     summary: Get a specific configuration
 *     tags: [Configurations]
 *     security:
 *       - bearerAuth: []
 *   put:
 *     summary: Update a configuration
 *     tags: [Configurations]
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     summary: Delete a configuration
 *     tags: [Configurations]
 *     security:
 *       - bearerAuth: []
 */
router.get('/configs/:id', authenticateToken, checkPermission('READ'), getConfigById);
router.put('/configs/:id', authenticateToken, checkPermission('WRITE'), updateConfig);
router.delete('/configs/:id', authenticateToken, checkPermission('DELETE'), deleteConfig);

module.exports = router;
