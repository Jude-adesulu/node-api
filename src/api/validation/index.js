const {transfer} = require('./transac.validation');
const {register, login, amountSchema} = require('./user.validation');

module.exports = {
    register,
    login,
    amountSchema,
    transfer,
  };
  