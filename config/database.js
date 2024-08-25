const { Pool } = require('pg');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST
});

module.exports = pool;