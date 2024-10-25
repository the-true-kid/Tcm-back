// routes/user.js
const express = require('express');
const authenticateToken = require('../middleware/authMiddleware'); 
const { findUserById } = require('../models/User');
const router = express.Router();

// GET /api/user - Fetch user by ID from token
// routes/user.js
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log('Decoded token:', req.user); // Log decoded token

    const user = await findUserById(req.user.userId); // Fetch user from DB

    if (!user) {
      console.log('No user found with ID:', req.user.userId); // Debug log
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User fetched from DB:', user); // Log user data

    res.json({ id: user.id, name: user.name, email: user.email }); // Ensure 'name' is sent
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
