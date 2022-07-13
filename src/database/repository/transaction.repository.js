const db = require('../db-config');
const {TransactionModel} = require('../../common/models');
const {throwErr} = require('../../common/utils');

module.exports = {
    // eslint-disable-next-line consistent-return
    transfer: async (data) => {
      try {
        const {
          sender, receiver, amount, newSenderBalance,
        } = data;
  
        const transactionId = await db.transaction(async (trx) => {
          const recipient = await db('users').where({ account_no: receiver }).first('account_no', 'balance');
          await trx('users').where({ account_no: sender }).update({ balance: newSenderBalance }).transacting(trx);
          await trx('users').where({ account_no: receiver }).update({ balance: parseFloat(recipient.balance) + parseFloat(amount) }).transacting(trx);
          const ids = await trx('transactions').insert({
            sender, receiver, amount,
          }).transacting(trx);
          return ids[0];
        });
  
        const transaction = await db('transactions').where({ id: transactionId }).first('id', 'sender', 'receiver', 'amount', 'created_at');
        return new TransactionModel(transaction);
      } catch (error) {
        throwErr(error.message, 500);
      }
    },
  };
  
