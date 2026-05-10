require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5001,
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1m',
};
