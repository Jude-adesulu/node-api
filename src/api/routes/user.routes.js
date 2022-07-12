const userRoute = require('../../common/config/router-config');
const userController = require('../controllers/user.controller');
const auth = require('../../common/middlewares/auth');

userRoute.post('/users/sign-up', userController.createUser);
userRoute.post('/users/login', userController.loginUser)
userRoute.post('/users/deposit', auth, userController.deposit);
userRoute.post('/users/withdraw', auth, userController.withdraw);

module.exports = userRoute;
