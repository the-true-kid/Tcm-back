// services/userService.js

const User = require('../models/User'); // Import the User model

// Create a new user
async function createUser(username, email, hashedPassword) {
  return await User.createUser(username, email, hashedPassword);
}

// Find user by ID
async function findById(userId) {
  return await User.findById(userId);
}

// Find user by email
async function findUserByEmail(email) {
  return await User.findUserByEmail(email);
}

// Get all users (for testing purposes)
async function findAll() {
  return await User.findAll();
}

module.exports = {
  createUser,
  findById,
  findUserByEmail,
  findAll,
};
