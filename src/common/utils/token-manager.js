const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwtManager = () =>{
    return {
        async sign(data) {
            return jwt.sign(data, process.env.JWT_SCRETE, {expiresIn: process.env.JWT_EXPIRE_TIME});
        },

        async verify(token){
            return jwt.verify(token, process.env.JWT_SCRETE);
        },
    };
}

module.exports = {jwtManager}