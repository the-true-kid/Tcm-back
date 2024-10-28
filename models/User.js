const pool = require('../config/dbConfig');

const User = {
  // Create a new user
  async createUser(username, email, hashedPassword) {
    const query = `
      INSERT INTO users (username, email, password) 
      VALUES ($1, $2, $3) 
      RETURNING *`;
    const { rows } = await pool.query(query, [username, email, hashedPassword]);
    return rows[0];
  },

  // Find a user by ID
  async findById(userId) {
    const query = `SELECT * FROM users WHERE user_id = $1`;
    const { rows } = await pool.query(query, [userId]);
    return rows[0];
  },

  // Find a user by email
  async findUserByEmail(email) {
    const query = `SELECT * FROM users WHERE email = $1`;
    const { rows } = await pool.query(query, [email]);
    return rows[0]; // Returns the user or undefined if not found
  },

  // Get all users (for testing purposes)
  async findAll() {
    const query = `SELECT * FROM users`;
    const { rows } = await pool.query(query);
    return rows;
  }
};

module.exports = User;
