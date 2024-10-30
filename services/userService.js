const User = require('../models/User'); // Import the User model

// Create a new user
async function createUser(username, email, hashedPassword) {
  try {
    const user = await User.create({ username, email, password: hashedPassword });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Find user by ID
async function findById(userId) {
  try {
    const user = await User.findByPk(userId); // Primary key lookup
    return user;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error;
  }
}

// Find user by email
async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
}

// Get all users (for testing purposes)
async function findAll() {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
}

module.exports = {
  createUser,
  findById,
  findUserByEmail,
  findAll,
};
