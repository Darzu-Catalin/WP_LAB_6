const express = require('express');
const {
  register,
  login,
  issueToken,
  switchRole,
  me,
} = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 */
router.post('/register', register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user and get JWT token
 *     tags: [Authentication]
 */
router.post('/login', login);

/**
 * @swagger
 * /token:
 *   post:
 *     summary: Generate JWT token (DEMO MODE)
 *     tags: [Authentication]
 *   get:
 *     summary: Generate JWT token (DEMO MODE)
 *     tags: [Authentication]
 */
router.post('/token', issueToken);
router.get('/token', issueToken);

/**
 * @swagger
 * /demo/switch-role:
 *   post:
 *     summary: Re-issue a JWT for the current user with a different role (demo only)
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [ADMIN, WRITER, VISITOR]
 */
router.post('/demo/switch-role', authenticateToken, switchRole);

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get current user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 */
router.get('/me', authenticateToken, me);

module.exports = router;
