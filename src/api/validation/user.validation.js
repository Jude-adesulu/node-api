const Joi = require('joi');

const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
const passwordErr = 'Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length';

const register = Joi.object().keys({
    email: Joi.string().email().required().trim()
      .lowercase(),
    password: Joi.string().regex(passwordPattern).required().messages({
      'string.empty': 'Password is required',
      'string.pattern.base': passwordErr,
    }),
    firstname: Joi.string().required().max(50).min(2),
    lastname: Joi.string().required().max(50).min(2),
  });
  
  const login = Joi.object().keys({
    email: Joi.string().email().required().trim()
      .lowercase(),
    password: Joi.string().required(),
  });
  
  const amountSchema = Joi.string().required();

  module.exports = {
    register,
    login,
    amountSchema,
  };