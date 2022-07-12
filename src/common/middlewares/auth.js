const { jwtManager, throwErr, sendErr } = require('../utils');
const {userRepo} = require('../../database');

const authenticate = async (req, res, next) =>{
    try{
    const reqHeaderAuth = req.headers.authorization;
    if(!reqHeaderAuth) throwErr('User must be logged in', 401);
    const [authBearer, token] = reqHeaderAuth.split(' ');
    if (authBearer !== 'Bearer') throwError('Authentication Failed, Bearer token missing', 401);
    const { userId, ...data } = await jwtManager().verify(token);
    const userFound = await userRepo.findBy({id:userId});
    if(!userFound) throwErr('User Not found', 401);
    req.auth = {...data, userId }
    next();

    }catch(err){
        return sendErr(res, err.message, err.statusCode);
    }
}

module.exports = authenticate;