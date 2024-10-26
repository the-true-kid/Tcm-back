const express = require('express');
const { saveGptRecommendations, getGptRecommendationsByUserId } = require('../models/gptRecommendationsModel');

const router = express.Router();

// Middleware to validate userId in route parameters
const validateUserId = (req, res, next) => {
  const { userId } = req.params;
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID format' });
  }
  next();
};

// Route to save GPT recommendations
router.post('/submit', async (req, res) => {
  try {
    const { userId, recommendations } = req.body;

    // Validate the request body
    if (!userId || !recommendations) {
      return res.status(400).json({ error: 'Missing userId or recommendations' });
    }

    const savedRecommendations = await saveGptRecommendations(userId, recommendations);
    res.status(201).json(savedRecommendations);
  } catch (error) {
    console.error('Error saving GPT recommendations:', error);
    res.status(500).json({ error: 'Failed to save GPT recommendations' });
  }
});

// Route to get GPT recommendations by user ID
router.get('/:userId', validateUserId, async (req, res) => {
  try {
    const { userId } = req.params;
    const recommendations = await getGptRecommendationsByUserId(userId);

    // Check if recommendations were found
    if (!recommendations || recommendations.length === 0) {
      return res.status(404).json({ error: 'No recommendations found for this user' });
    }

    res.status(200).json(recommendations);
  } catch (error) {
    console.error('Error retrieving GPT recommendations:', error);
    res.status(500).json({ error: 'Failed to retrieve GPT recommendations' });
  }
});

module.exports = router;
