const knex = require('../db/db');


const fund_Acc = (req, res)=>{
    const userId = req.params.id;
    const amount = req.body.amount;

    knex('users')
    .where({id:userId})
    .first()
    .then(user=>{
        if(user){
            newBal =user.balance +=amount
            knex('users').where('id', userId).update({balance:newBal})
            .then(()=>{
                res.status(200).send(`A total of ${amount} was send to your account\n New balance is ${newBal}`)
            })

            
        }
    })
    


}


module.exports = {fund_Acc}