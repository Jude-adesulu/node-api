const {userRepo} = require('../../database');

module.exports = {
    createUser: async (data) => await userRepo.createUser(data),

    findBy: async (data) => await userRepo.findBy(data),

    updateBalance: async (filter, data) => await userRepo.updateBalance(filter, data),

    userTransactions: async (account_no) => await userRepo.userTransactions(account_no)
}