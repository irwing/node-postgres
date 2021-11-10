const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5431,
  user: 'postgres',
  password: 'postgres',
  database: 'users',
});

module.exports = pool;
