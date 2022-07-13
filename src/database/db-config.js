const knex = require('knex');
const config = require('./knexfile');
const { NODE_ENV } = require('../common/config');

let db = null;

if (NODE_ENV === 'test') {
    db = knex(config.test);
  } else {
    db = knex(config.development);
  }

module.exports = db