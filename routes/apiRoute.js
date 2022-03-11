const express = require('express')
const router = express.Router();
const dotenv = require('dotenv')

const loginController = require('../controllers/loginController')
const createUserController = require('../controllers/createUserController')
const userAuthController = require('../controllers/userAuthController')
const userTransferController = require('../controllers/transferController')

dotenv.config()