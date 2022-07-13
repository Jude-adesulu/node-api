require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3001,
  NODE_ENV: 'test',
  JWT_SECRET_KEY: process.env.JWT_SECRET,
  BASE_URL: process.env.BASE_URL,
};