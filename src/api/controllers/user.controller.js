
const userService = require('../services/user.service');
const {jwtManager, sendSuccess, sendErr, hashManager, throwErr} = require('../../common/utils');
const {register, login, amountSchema} = require('../validation');
const { v4: uuidv4 } = require('uuid');
const serverErr = require('../../common/middlewares/ServerErr')

module.exports = {
  //POST /users/sign-up
    createUser: async (req, res) =>{
        try{
            await register.validateAsync(req.body);
            const {email, password} = req.body;

            const userFound = await userService.findBy({email});
            if(userFound) throwErr('User already exist', 409);

            const hashPassword = await hashManager().hash(password);

            req.body.password = hashPassword

            let min = 1000000000;
            let max = 9999999999;

            //generate account number
            req.body.account_no = Math.floor(Math.random(min-max) *9000000000) + 1000000000

            req.body.id = uuidv4();

            //create user
            const user = await userService.createUser(req.body);
            // const user = req.body
            // return user

            //generate token
            const token = await jwtManager().sign({email, userId: user.id});

            return sendSuccess(res, {token, user }, 'User created successfully', 201);

        }catch(err){
            if(err.isJoi===true) return sendErr(res, err.details[0].message, 422)
            return serverErr(err.message, res);
        }
    },

    // POST /users/login
  loginUser: async (req, res) => {
    try {
      await login.validateAsync(req.body);
      const { email, password } = req.body;

      // Check if user exists
      const userFound = await userService.findBy({email});

      if (!userFound) throwErr('User not found', 404);

      // Check if password is correct
      const isValid = await hashManager().compare(password, userFound.password);

      if (!isValid) throwErr('Invalid password', 401);

      const token = await jwtManager().sign({ email, userId: userFound.id });
      delete userFound.password;

      return sendSuccess(res, { token, user: userFound }, 'User logged in successfully', 200);
    } catch (err) {
      if (err.isJoi === true) return sendErr(res, err.details[0].message, 422);
      return serverErr(err.message, res)
    }
  },

  //POST /users/deposit
  deposit: async (req, res) => {
    try {
      await amountSchema.validateAsync(req.body.amount);
      const { amount } = req.body;
      const { userId } = req.auth;

      const user = await userService.findBy({ id: userId });

      const newBalance = parseFloat(user.balance) + parseFloat(amount);

      const updatedUser = await userService.updateBalance({ id: userId }, { balance: newBalance });
      return sendSuccess(res, updatedUser, 'Deposit successful', 200);
    } catch (err) {
       if (err.isJoi === true) sendErr(res, err.details[0].message, 422);
      return serverErr(err.message, res);
    }
  },

   // POST /users/withdraw
   withdraw: async (req, res) => {
    try {
      await amountSchema.validateAsync(req.body.amount);
      const { amount } = req.body;
      const { userId } = req.auth;

      const user = await userService.findBy({ id: userId });

      const { balance } = user;

      if (parseFloat(balance) < parseFloat(amount)) throwErr('Insufficient balance', 400);

      const newBalance = parseFloat(balance) - parseFloat(amount);

      const updatedUser = await userService.updateBalance({ id: userId }, { balance: newBalance });
      return sendSuccess(res, updatedUser, 'Withdrawal successful', 200);
    } catch (err) {
      if (err.isJoi === true) return sendErr(res, err.details[0].message, 422);
      return serverErr(err.message, res);
    }
  },
}
