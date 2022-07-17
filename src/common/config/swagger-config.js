const { BASE_URL } = require('.');

const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'Simple Wallet API',
    version: '1.0.0',
    description: 'Simple Wallet API',
    contact: {
      name: 'API Support',
      email: 'judeadesuluflyer6@gmail.com',
    },
  },
  servers: [
    {
      url: `${BASE_URL}/api`,
      description: 'Development server',
    },
  ],
};

module.exports = swaggerDefinition;
