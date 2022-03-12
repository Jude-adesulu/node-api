
const knex = require('../db/db');

const dotenv = require('dotenv')


dotenv.config()

const user_transfer = async (req, res)=>{
    
    const userId = await (req.params.id);
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
                    let newBal = user.balance -= amount;
                    knex('users').where('id', userId).update({balance:newBal})
                    .then(()=>{
                        res.status(200).send(`Transaction was successful \n Your new balance is ${newBal}`)
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
    .catch((err)=>{
        res.status(401).json({message:err})
    })
    
}


module.exports = {user_transfer}