const { jwtManager, throwErr, sendErr } = require('../utils');
const {userRepo} = require('../../database');

const authenticate = async (req, res, next) =>{
    try{
        const reqHeaderAuth = req.headers.authorization;

        if (!reqHeaderAuth) throwErr('Authentication Failed. Please login', 401);
    
        const [authBearer, token] = reqHeaderAuth.split(" ");
    
        if (authBearer !== 'Bearer') throwErr('Authentication Failed, Bearer token missing', 401);
    
        const  { userId, ...data } = await jwtManager().verify(token);
    
        const userExist = await userRepo.findBy({ id: userId })
    
        if (!userExist) throwErr('Authentication Failed, User not found', 401);
    
        req.auth = { userId, ...data };    
        next();

    }catch(err){
        return sendErr(res, err.message, 500);
    }
}

module.exports = authenticate;