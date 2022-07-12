require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET_KEY: process.env.JWT_SECRET,
  BASE_URL: process.env.BASE_URL,
};