const baseRoute = require('../../common/config/router-config');

baseRoute.get('/', (req, res) => res.status(200).json({
  success: true,
  message: 'Wallet application service API',
}));

module.exports = baseRoute;
