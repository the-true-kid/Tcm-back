// models/User.js

const db = require('../config/dbConfig'); // Import the database connection

// Define the User model
const User = {
  // Method to create the users table
  createTable: async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      );
    `;
    try {
      await db.query(query);
      console.log('Users table created successfully.');
    } catch (error) {
      console.error('Error creating users table:', error.message);
      throw new Error('Failed to create users table.');
    }
  },

  // Method to create a new user
  createUser: async (username, email, hashedPassword) => {
    const query = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    try {
      const result = await db.query(query, [username, email, hashedPassword]);
      return result.rows[0]; // Return the created user
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw new Error('Failed to create user.');
    }
  },

  // Method to find a user by ID
  findById: async (userId) => {
    const query = `
      SELECT * FROM users WHERE user_id = $1;
    `;
    try {
      const result = await db.query(query, [userId]);
      if (result.rows.length === 0) throw new Error('User not found');
      return result.rows[0]; // Return the user
    } catch (error) {
      console.error('Error finding user by ID:', error.message);
      throw new Error('Failed to find user by ID.');
    }
  },

  // Method to find a user by email
  findUserByEmail: async (email) => {
    const query = `
      SELECT * FROM users WHERE email = $1;
    `;
    try {
      const result = await db.query(query, [email]);
      if (result.rows.length === 0) return null; // No user found
      return result.rows[0]; // Return the user
    } catch (error) {
      console.error('Error finding user by email:', error.message);
      throw new Error('Failed to find user by email.');
    }
  },

  // Method to get all users
  findAll: async () => {
    const query = `
      SELECT * FROM users;
    `;
    try {
      const result = await db.query(query);
      return result.rows; // Return all users
    } catch (error) {
      console.error('Error fetching all users:', error.message);
      throw new Error('Failed to fetch all users.');
    }
  }
};

module.exports = User;
