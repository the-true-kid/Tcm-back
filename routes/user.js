const express = require('express');
const router = express.Router();
const userService = require('../services/userService'); // Import userService

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await userService.createUser(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user.' });
  }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await userService.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found.' });

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user.' });
  }
});

module.exports = router;
