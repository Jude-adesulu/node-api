const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/apiRoute');
const dotenv = require('dotenv')

dotenv.config()

//set express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json())


//initialize routes
app.use('/api', routes)

//listen to port 
app.listen(8080, ()=>{console.log('server is listening to port 8080')})
