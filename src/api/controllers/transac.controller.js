const transactionService = require('../services/transac.service');
const userService = require('../services/user.service');
const { sendSuccess, sendErr, throwErr } = require('../../common/utils');
const { transfer } = require('../validation');

module.exports = {
  transfer: async (req, res) => {
    try {
      await transfer.validateAsync(req.body);
      const { userId } = req.auth;
      const { amount } = req.body;

      const user = await userService.findBy({ id: userId });

      if (!user) throwErr('User not found', 404);

      const { balance } = user;

      if (parseFloat(amount) > parseFloat(balance)) throwErr('Insufficient balance', 400);

      const newSenderBalance = balance - amount;

      req.body.sender = user.account_no;
      req.body.newSenderBalance = newSenderBalance;

      const transaction = await transactionService.transfer(req.body);
      return sendSuccess(res, transaction, 'Transaction successfull', 201);
    } catch (err) {
      if (err.isJoi === true) return sendErr(res, err.details[0].message, 422);
      return sendErr(res, err.message, err.statusCode);
    }
  },
};
