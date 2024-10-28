const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
require('dotenv').config();

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create(name, email, hashedPassword);

    const { user_id, username } = newUser; // Extract only relevant fields

    res.status(201).json({ user_id, username, email });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.user_id }, // Ensure user_id is correct
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ 
      token, 
      message: 'Login successful. Token expires in 1 hour.' 
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
