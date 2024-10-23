const express = require('express');
const authenticateToken = require('../middleware/authMiddleware'); // JWT auth middleware
const { findUserByEmail } = require('../models/User');
const router = express.Router();

// Protected route to get the authenticated user's data
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const user = await findUserByEmail(req.user.email); // Use the email from the JWT payload
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Return user data without sensitive information (like password)
    res.json({ id: user.id, email: user.email });
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
