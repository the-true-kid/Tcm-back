// models/User.js
const pool = require('../config/dbConfig'); // Import database pool

// Create a new user
const createUser = async (name, email, hashedPassword) => {
  const result = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, hashedPassword]
  );
  return result.rows[0];
};

// Find a user by email
const findUserByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0]; // Return the user or undefined if not found
};

// Find a user by ID
const findUserById = async (id) => {
  const result = await pool.query(
    'SELECT id, name, email FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0]; // Return the user or undefined if not found
};

module.exports = { createUser, findUserByEmail, findUserById };
