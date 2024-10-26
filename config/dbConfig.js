const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Set the search_path to use your schema on every connection
pool.on('connect', async (client) => {
  try {
    await client.query('SET search_path TO tcm_app_schema');
    console.log('Connected to the PostgreSQL database with schema set');
  } catch (err) {
    console.error('Error setting schema:', err);
  }
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

module.exports = pool;
