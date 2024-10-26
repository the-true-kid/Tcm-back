const express = require('express');
const router = express.Router();
const {
  savePatientResponses,
  getPatientResponsesByUserId,
} = require('../models/patientResponsesModel');

// POST route to save patient responses
router.post('/new', async (req, res) => {
  try {
    const responses = req.body; // Extract responses from the request body

    const savedResponse = await savePatientResponses(responses);
    res.status(201).json(savedResponse);
  } catch (error) {
    console.error('Error saving patient responses:', error);
    res.status(500).json({ error: 'Failed to save patient responses.' });
  }
});

// GET route to retrieve patient responses by user ID
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const responses = await getPatientResponsesByUserId(userId);

    if (responses.length === 0) {
      return res.status(404).json({ error: 'No responses found for this user.' });
    }

    res.status(200).json(responses);
  } catch (error) {
    console.error('Error retrieving patient responses:', error);
    res.status(500).json({ error: 'Failed to retrieve patient responses.' });
  }
});

module.exports = router;
