// routes/patientResponsesRoutes.js
const express = require('express');
const { savePatientResponses, getPatientResponsesByUserId } = require('../models/patientResponsesModel');

const router = express.Router();

// Route to save patient responses
router.post('/submit', async (req, res) => {
  try {
    const { userId, responses } = req.body;
    const savedResponse = await savePatientResponses(userId, responses);
    res.status(201).json(savedResponse);
  } catch (error) {
    console.error('Error saving patient responses:', error);
    res.status(500).json({ error: 'Failed to save patient responses' });
  }
});

// Route to get patient responses by user ID
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const responses = await getPatientResponsesByUserId(userId);
    res.status(200).json(responses);
  } catch (error) {
    console.error('Error retrieving patient responses:', error);
    res.status(500).json({ error: 'Failed to retrieve patient responses' });
  }
});

module.exports = router;
