const pool = require('../config/dbConfig'); // Import database pool

// Create a new user
const createUser = async (name, email, hashedPassword) => {
  try {
    const result = await pool.query(
      'INSERT INTO tcm_app_schema.users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );
    return result.rows[0]; // Return the created user
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

// Find a user by email
const findUserByEmail = async (email) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tcm_app_schema.users WHERE email = $1',
      [email]
    );
    return result.rows[0]; // Return the user or undefined if not found
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
};

// Find a user by ID
const findUserById = async (id) => {
  try {
    const result = await pool.query(
      'SELECT user_id, username, email FROM tcm_app_schema.users WHERE user_id = $1',
      [id]
    );
    return result.rows[0]; // Return the user or undefined if not found
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error;
  }
};

module.exports = { createUser, findUserByEmail, findUserById };
