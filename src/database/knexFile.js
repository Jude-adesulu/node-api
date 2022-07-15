const dotenv = require('dotenv')


dotenv.config()

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 module.exports = {
    development: {
      client: 'mysql',
      connection: {
        database: "wallet_dev",
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      },
      useNullAsDefault: true,
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: 'knex_migrations',
      },
      seeds: {
        directory: './seeds',
      },
    },
  
    test: {
      client: 'mysql',
      connection: {
        database: 'wallet_test',
        user: 'root',
        password:'',
      },
      useNullAsDefault: true,
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: 'knex_migrations',
      },
      seeds: {
        directory: './seeds',
      },
    },
  };
  
    

    