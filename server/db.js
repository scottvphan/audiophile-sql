require('dotenv').config()
const Pool = require('pg-pool');

// PostgreSQL config
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "audiophile",
    password: process.env.POSTGRESQL_PASS,
    port:5432,
})

module.exports = pool