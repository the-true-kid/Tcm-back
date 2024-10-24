const pool = require('../config/dbConfig'); // Import the pool

const createUser = async (email, hashedPassword) => {
  const result = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    [email, hashedPassword]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await pool.query(
    'SELECT id, email FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0]; // Return the first user found or undefined
};

module.exports = { createUser, findUserByEmail, findUserById };
