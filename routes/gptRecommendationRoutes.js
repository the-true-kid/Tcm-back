// routes/gptRecommendationsRoutes.js
const express = require('express');
const { saveGptRecommendations, getGptRecommendationsByUserId } = require('../models/gptRecommendationsModel');

const router = express.Router();

// Route to save GPT recommendations
router.post('/submit', async (req, res) => {
  try {
    const { userId, recommendations } = req.body;
    const savedRecommendations = await saveGptRecommendations(userId, recommendations);
    res.status(201).json(savedRecommendations);
  } catch (error) {
    console.error('Error saving GPT recommendations:', error);
    res.status(500).json({ error: 'Failed to save GPT recommendations' });
  }
});

// Route to get GPT recommendations by user ID
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const recommendations = await getGptRecommendationsByUserId(userId);
    res.status(200).json(recommendations);
  } catch (error) {
    console.error('Error retrieving GPT recommendations:', error);
    res.status(500).json({ error: 'Failed to retrieve GPT recommendations' });
  }
});

module.exports = router;
