const express = require('express');
const router = express.Router();
const authService = require('../services/authService'); // Import authService

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newUser = await authService.register(username, email, password); // Use authService

    const { user_id, username: name, email: userEmail } = newUser;
    res.status(201).json({ user_id, username: name, email: userEmail });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(400).json({ message: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const { token, userId } = await authService.login(email, password); // Use authService

    res.json({
      token,
      userId,
      message: 'Login successful. Token expires in 1 hour.',
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
