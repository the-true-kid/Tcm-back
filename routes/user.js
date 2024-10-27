const express = require('express');
const authenticateToken = require('../middleware/authMiddleware'); 
const { findUserById } = require('../models/User');
const router = express.Router();

// GET /api/user - Fetch user by ID from the token
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log('Decoded token:', req.user); // Log decoded token

    // Fetch user from DB using the decoded token's userId
    const user = await findUserById(req.user.user_id); 

    if (!user) {
      console.log('No user found with ID:', req.user.user_id); // Debug log
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User fetched from DB:', user); // Log user data

    // Ensure response matches the expected user fields
    res.json({ 
      id: user.user_id, 
      name: user.username, 
      email: user.email 
    });
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
