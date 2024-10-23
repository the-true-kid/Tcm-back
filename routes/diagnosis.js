const express = require('express');
const { createDiagnosis, getUserDiagnoses } = require('../models/Diagnosis');
const router = express.Router();
const pool = require('../config/dbConfig');

// Route to handle new diagnosis submission
router.post('/new', async (req, res) => {
  try {
    const { userId, report } = req.body; // Ensure frontend sends these
    const diagnosis = await createDiagnosis(userId, report);
    res.status(201).json(diagnosis);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Route to get a user's diagnosis history
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const diagnoses = await getUserDiagnoses(userId);
    res.json(diagnoses);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

module.exports = router;
