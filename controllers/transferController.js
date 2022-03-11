
const knex = require('../db/db');

const dotenv = require('dotenv')


dotenv.config()

const user_transfer = (req, res)=>{
    const userId = req.params.id;
    const receiverId = req.body.id;
    const amount = req.body.amount;


    
    knex('users')
    .where({id:userId})
    .first()
    .then(user=>{
        if(user.balance >amount){
            
            knex('users')
            .where({id:receiverId})
            .first()
            .then(receiver=>{
                if(!receiver){
                    res.send("User ID not found")
                }else{
                    var newBal = user.balance -= amount;
                    knex('users').where('id', userId).update({balance:newBal})
                    .then(()=>{
                        res.send(`Transaction was successful \n Your new balance is ${newBal}`)
                    })
                   
                    
                    knex('users')
                    .where({id:receiverId})
                    .first()
                    .then(receiver=>{
                        if(receiver){
                            var newBal = receiver.balance += parseFloat(amount);
                            knex('users').where('id', receiverId).update({balance:newBal})
                            .then(()=>{res.send(` Money receieved `)})
                            
                        }
                    })
                    
                }
            })
        }
    })
   
    
}


module.exports = {user_transfer}