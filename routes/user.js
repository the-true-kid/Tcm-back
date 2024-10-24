const express = require('express');
const authenticateToken = require('../middleware/authMiddleware'); 
const { findUserById } = require('../models/User'); // Import the correct function
const router = express.Router();

// GET /api/user - Fetch user by ID from token
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log('Decoded token:', req.user); // Log the decoded token

    const user = await findUserById(req.user.userId); // Use userId from token

    if (!user) {
      console.log('No user found with ID:', req.user.userId); // Debug log
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ id: user.id, email: user.email }); // Send user data
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

