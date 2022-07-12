const dbConnection = require('./db-config');
const userRepo = require('./repository/user.repository');
const transactionRepo = require('./repository/transaction.repository');

module.exports = {
    dbConnection,
    userRepo,
    transactionRepo
}