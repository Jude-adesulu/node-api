const dotenv = require('dotenv')


dotenv.config()

const knex = require("knex")({
    client: 'mysql',
    connection:{
        host : process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password:'',
        database:process.env.DB_NAME
    },
    pool:{min: 0, max:10},

    
});


//check the connection if it works
knex.raw("SELECT VERSION()").then(()=>{
    console.log('connection to db was successful');
})

module.exports = knex;