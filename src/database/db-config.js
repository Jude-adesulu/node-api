const knex = require('knex');
const config = require('./knexfile.js');
const { NODE_ENV } = require('../common/config');

let db = null;

if(NODE_ENV === 'development'){
    db = knex(config.development)
}


module.exports = db