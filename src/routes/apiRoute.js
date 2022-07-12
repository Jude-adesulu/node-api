const express = require('express')
const router = express.Router();
const dotenv = require('dotenv')

const loginController = require('../controllers/loginController')
const createUserController = require('../controllers/createUserController')
const userAuthController = require('../controllers/userAuthController')
const userTransferController = require('../controllers/transferController')
const userFundController = require('../controllers/userFundController')
const userWithdrawController = require('../controllers/userWithdrawController')

dotenv.config()

//create user
router.post('/createUser', createUserController.create_user)


//authenticate registered users
router.get('/login', loginController.user_login)

//verify user token
router.get('/user/verify', userAuthController.user_auth)

//transfer to another user on the database
router.put('/userTransfer/:id', userTransferController.user_transfer)

//user to fund acc
router.put('/user/fundAcc/:id', userFundController.fund_Acc)

//user to withdraw
router.put('/user/withdraw/:id', userWithdrawController.withdraw_fund)




module.exports = router;

