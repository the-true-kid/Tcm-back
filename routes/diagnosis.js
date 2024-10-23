// routes/diagnosis.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { createDiagnosis, getUserDiagnoses } = require('../models/Diagnosis');
const router = express.Router();

// Route to handle new diagnosis submission
router.post('/new', async (req, res) => {
  try {
    console.log('POST /api/diagnosis/new called');

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    console.log('User ID from token:', userId);

    const report = JSON.stringify(req.body);
    console.log('Creating new diagnosis with:', { userId, report });

    const diagnosis = await createDiagnosis(userId, report);
    console.log('Diagnosis created successfully:', diagnosis);

    res.status(201).json(diagnosis);
  } catch (error) {
    console.error('Error in POST /api/diagnosis/new:', error.message);

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Route to get all diagnoses for the logged-in user
router.get('/user/reports', async (req, res) => {
  try {
    console.log('GET /api/diagnosis/user/reports called');

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    console.log('Fetching diagnoses for user ID:', userId);

    const diagnoses = await getUserDiagnoses(userId);
    console.log('Fetched diagnoses:', diagnoses);

    res.json(diagnoses);
  } catch (error) {
    console.error('Error in GET /api/diagnosis/user/reports:', error.message);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

module.exports = router;
