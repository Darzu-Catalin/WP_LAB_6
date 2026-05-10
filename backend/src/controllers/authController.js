const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET, JWT_EXPIRATION } = require('../config/env');
const {
  getUsers,
  getNextUserId,
  addUser,
} = require('../data/store');
const { getPermissionsForRole } = require('../utils/permissions');

async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    const normalizedUsername = (username || '').trim();
    const normalizedEmail = (email || '').trim().toLowerCase();

    if (!normalizedUsername || !normalizedEmail || !password) {
      return res.status(400).json({
        error: 'Missing required fields: username, email, password',
      });
    }

    if (normalizedUsername.length < 3) {
      return res.status(400).json({ error: 'Username must be at least 3 characters' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existingUser = getUsers().find(
      (u) => u.username.toLowerCase() === normalizedUsername.toLowerCase() || u.email === normalizedEmail
    );

    if (existingUser) {
      return res.status(400).json({
        error: 'Username or email already exists',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = {
      id: getNextUserId(),
      username: normalizedUsername,
      email: normalizedEmail,
      passwordHash,
      role: 'WRITER',
      createdAt: new Date().toISOString(),
    };

    addUser(newUser);

    return res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      message: 'User registered successfully. You can now login.',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const normalizedUsername = (username || '').trim();
    const lookup = normalizedUsername.toLowerCase();

    if (!normalizedUsername || !password) {
      return res.status(400).json({
        error: 'Missing required fields: username, password',
      });
    }

    const user = getUsers().find(
      (u) => u.username.toLowerCase() === lookup || u.email.toLowerCase() === lookup
    );

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const permissions = getPermissionsForRole(user.role);
    const payload = { userId: user.id, username: user.username, role: user.role, permissions };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    return res.json({
      token,
      expiresIn: JWT_EXPIRATION,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Login failed' });
  }
}

function issueToken(req, res) {
  const role = req.method === 'GET' ? req.query.role : req.body.role;
  const validRoles = ['ADMIN', 'WRITER', 'VISITOR'];

  if (!role || !validRoles.includes(role)) {
    return res.status(400).json({
      error: `Invalid role. Must be one of: ${validRoles.join(', ')}`,
    });
  }

  const permissions = getPermissionsForRole(role);
  const payload = { role, permissions };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

  return res.json({
    token,
    expiresIn: JWT_EXPIRATION,
    role,
    permissions,
  });
}

function me(req, res) {
  const user = getUsers().find((u) => u.id === req.user.userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    permissions: req.user.permissions,
    createdAt: user.createdAt,
  });
}

module.exports = {
  register,
  login,
  issueToken,
  me,
};
