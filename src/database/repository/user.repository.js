const db = require('../db-config');
const { UserModel } = require('../../common/models');
const { throwErr } = require('../../common/utils');

module.exports = {
    createUser: async(data) =>{
        const user = await db('users')
        .insert(data).then((id) => db('users')
        .where({ id })
        .first('id', 'email', 'firstname', 'lastname', 'balance', 'account_no'));
    return new UserModel(user);
  },

  async findBy(credentials) {
    const user = await db('users').where(credentials).first('id', 'email', 'firstname', 'lastname', 'balance', 'password', 'account_no');
    if (user) {
      const transactions = await this.userTransactions(user.account_no);
      user.transactions = transactions;
      return user;
    }
    return null;
  },

    userTransactions: async (account_no, limit = 5) => {
        const transactions = await db('transactions')
      .join('users', 'users.account_no', '=', 'transactions.receiver')
      .where({ sender: account_no })
      .select('users.firstname', 'users.lastname', 'transactions.id', 'transactions.amount', 'transactions.created_at')
      .orderBy('transactions.created_at', 'desc')
      .limit(limit);
    return transactions;
    },

    updateBalance: async (filter, data) => {
        const rows = await db.transaction(async (trx) => await db('users').where(filter).update(data).transacting(trx));
    if (rows > 0) {
      const details = await db('users').where(filter).first('id', 'firstname', 'lastname', 'balance', 'account_no');
      return details;
        }
        throwErr('User not found', 404);
    }
}
