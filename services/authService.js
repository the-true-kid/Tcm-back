const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('./userService'); // Reuse userService functions

// Register a new user
async function register(username, email, password) {
  // Check if the user already exists
  const existingUser = await userService.findUserByEmail(email);
  if (existingUser) throw new Error('User already exists.');

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new user
  const newUser = await userService.createUser(username, email, hashedPassword);

  return newUser;
}

// Login an existing user and generate JWT
async function login(email, password) {
  const user = await userService.findUserByEmail(email);
  if (!user) throw new Error('Invalid credentials.');

  // Compare the password with the stored hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials.');

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.user_id }, // Payload
    process.env.JWT_SECRET, // Secret from .env
    { expiresIn: '1h' }
  );

  return { token, userId: user.user_id };
}

module.exports = { register, login };
