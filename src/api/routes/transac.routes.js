const transactionRoute = require('../../common/config/router-config');
const transactionController = require('../controllers/transac.controller');
const auth = require('../../common/middlewares/auth');

transactionRoute.post('/transactions/transfer', auth, transactionController.transfer);

module.exports = transactionRoute;