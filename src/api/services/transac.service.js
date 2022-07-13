const { transactionRepo } = require('../../database');

module.exports = {
    transfer: async (data) => await transactionRepo.transfer(data)
}