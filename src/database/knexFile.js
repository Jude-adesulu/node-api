const dotenv = require('dotenv')


dotenv.config()
module.exports = {
    development: {
        client: 'mysql',
        connection:{
            host : process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password:'',
            database:process.env.DB_NAME
        },
        pool:{min: 0, max:10},
        useNullAsDefault: true,
        migration: {
            tableName: 'Knex_migrations',
        },
        seeds: {
            directory: './seeds',
        },
    }
}

    

    