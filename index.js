const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/apiRoute');
const dotenv = require('dotenv')

dotenv.config()

//set express app
const app = express();