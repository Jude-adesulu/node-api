const knex = require('../db/db');


const withdraw_fund = (req, res)=>{
    const userId = req.params.id;
    const amount = req.body.amount;

    knex('users')
    .where({id:userId})
    .first()
    .then(user=>{
        if(user.balance >amount){
            let newBal = user.balance -= amount;
            knex('users').where('id', userId).update({balance:newBal})
            .then(()=>{
                res.status(200).send(`You have withdraw a Total sum of ${amount} \n New balance is ${newBal}`)
            })
            
        }else{
            res.status(401).send(`Insufficient fund`)
        }
    })
    


}


module.exports = {withdraw_fund}