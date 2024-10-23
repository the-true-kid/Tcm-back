const express = require('express');
const jwt = require('jsonwebtoken');
const { createDiagnosis, getUserDiagnoses } = require('../models/Diagnosis');
const router = express.Router();

// Route to handle new diagnosis submission
router.post('/new', async (req, res) => {
  try {
    console.log('POST /api/diagnosis/new called');

    // Check if the authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    // Extract and verify the token
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    console.log('User ID from token:', userId);

    // Convert form responses to a report object (or string if required)
    const report = JSON.stringify(req.body);
    console.log('Creating new diagnosis with:', { userId, report });

    // Create a new diagnosis entry in the database
    const diagnosis = await createDiagnosis(userId, report);
    console.log('Diagnosis created successfully:', diagnosis);

    res.status(201).json(diagnosis);
  } catch (error) {
    console.error('Error in POST /api/diagnosis/new:', error.message);

    // Handle invalid token error
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Route to get a user's diagnosis history
router.get('/user/:userId', async (req, res) => {
  try {
    console.log('GET /api/diagnosis/user/:userId called');

    const { userId } = req.params;
    console.log('Fetching diagnoses for user ID:', userId);

    // Fetch the diagnosis history for the user
    const diagnoses = await getUserDiagnoses(userId);
    console.log('Fetched diagnoses:', diagnoses);

    res.json(diagnoses);
  } catch (error) {
    console.error('Error in GET /api/diagnosis/user/:userId:', error.message);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

module.exports = router;
