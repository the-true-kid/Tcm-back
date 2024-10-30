const { Pool } = require('pg'); // Import the pg library
require('dotenv').config(); // Load .env variables

// Create a new PostgreSQL pool
const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

// Test the connection (optional)
pool.connect(err => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = pool; // Export the pool instance
