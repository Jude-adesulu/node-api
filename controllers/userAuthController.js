
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')


dotenv.config()

const user_auth = (req, res) =>{
    const token = req.headers.authorization.split(" ")[1]
    
    //generate token for authentication
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken)=>{
        if(err){
            return res.status(401).json({error: 'Unable to verify token '})
      
        }else{
            res.status(200).json({
                id: decodedToken.id,
                name: decodedToken.name,
                email:decodedToken.email,
                account_number:decodedToken.account_number,
                balance: decodedToken.balance
            })
        }
    })
}

module.exports ={user_auth}