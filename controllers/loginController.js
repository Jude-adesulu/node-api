const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const knex = require('../db/db');



dotenv.config()

const user_login = (req, res)=>{

    knex.select()
    .from('users')
    .where({email:req.body.email})
    .first()
    .then(user =>{
        if(!user){
            res.status(401).json({error:"No user found"})
        }else{
            return bcrypt.compare(req.body.password, user.password)
            .then(isAuth =>{
                if(!isAuth){
                    res.status(401).send({error:"Password Incorrect"})
                }else{

                    //generate token 
                    return jwt.sign({
                            id:user.id,
                            name: user.name,
                            email:user.email,
                            account_number:user.account_number,
                            balance: user.balance
                             
                            
                        },
                            process.env.JWT_SECRET,
                            {
                                expiresIn: '2d'
                            },
                             (err, token) =>{
                        if(err){
                            return res.status(500).send(err)
                        }else{
                            res.status(200).json({token})
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

module.exports = {user_login}