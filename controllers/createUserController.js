const bcrypt = require('bcrypt');
const knex = require('../db/db');
const dotenv = require('dotenv')


dotenv.config()


const create_user = async (req, res)=>{

    const hashPassword =await bcrypt.hash(req.body.password, 10)

    let min = 10000;
    let max = 99999;

    //generate account number
     let account = Math.floor(Math.random(min-max) *90000) + 10000


    const name = req.body.name;
    const email = req.body.email;
    const balance = 0;
    const account_number = account;
    const password = hashPassword;
    

    //connect query to database
    knex.select()
    .from("users")
    .where("email", email)
    .then((result)=> {
        if (result.length === 0) {
            return knex('users')
              .insert([{
                name:name,
                email: email,
                account_number: account_number,
                password: password,
                balance : balance
              }])
              .then(() => {
                  res.status(200).send({
                      name,
                      email,
                      account_number,
                      balance,  
                      message: "You have successfully created an account"
                  })
              })
             
        }
    res.status(422).send('Email already Exist')
    return;
})
}

module.exports = {create_user}