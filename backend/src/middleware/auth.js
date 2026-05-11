const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const { getUsers } = require('../data/store');

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err.message);
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    // Demo tokens (issued by /token) carry a synthetic userId — no real user record.
    if (decoded.demo) {
      req.user = { ...decoded };
      return next();
    }

    const user = getUsers().find((u) => u.id === decoded.userId);
    if (!user) {
      return res.status(403).json({ error: 'User not found' });
    }

    req.user = {
      ...decoded,
      email: user.email,
    };

    return next();
  });
}

function checkPermission(requiredPermission) {
  return (req, res, next) => {
    const userPermissions = req.user.permissions || [];
    const userRole = req.user.role;

    if (userRole === 'ADMIN') {
      return next();
    }

    if (userPermissions.includes(requiredPermission)) {
      return next();
    }

    return res.status(403).json({
      error: `Insufficient permissions. Required: ${requiredPermission}`,
    });
  };
}

module.exports = {
  authenticateToken,
  checkPermission,
};
