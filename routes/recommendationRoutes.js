const express = require('express');
const router = express.Router();
const recommendationService = require('../services/recommendationService');

// Route: Create a new recommendation
router.post('/', async (req, res) => {
  try {
    const { formId, recommendationText } = req.body;

    // Input validation
    if (!formId || !recommendationText) {
      return res.status(400).json({ error: 'Form ID and recommendation text are required.' });
    }

    // Create the recommendation
    const recommendation = await recommendationService.createRecommendation(formId, recommendationText);
    res.status(201).json(recommendation);
  } catch (error) {
    console.error('Error creating recommendation:', error.message);
    res.status(500).json({ error: 'Failed to create recommendation.' });
  }
});

// Route: Bulk create recommendations
router.post('/bulk', async (req, res) => {
  try {
    const { formId, recommendations } = req.body;

    // Validate input
    if (!formId || !Array.isArray(recommendations) || recommendations.length === 0) {
      return res.status(400).json({ error: 'Form ID and a valid array of recommendations are required.' });
    }

    // Save multiple recommendations
    const savedRecommendations = await recommendationService.saveBulkRecommendations(formId, recommendations);
    res.status(201).json(savedRecommendations);
  } catch (error) {
    console.error('Error creating recommendations in bulk:', error.message);
    res.status(500).json({ error: 'Failed to create recommendations in bulk.' });
  }
});

// Route: Get recommendation by ID
router.get('/:id', async (req, res) => {
  try {
    const recommendation = await recommendationService.getRecommendationById(req.params.id);

    if (!recommendation) {
      return res.status(404).json({ error: 'Recommendation not found.' });
    }

    res.json(recommendation);
  } catch (error) {
    console.error('Error fetching recommendation:', error.message);
    res.status(500).json({ error: 'Failed to fetch recommendation.' });
  }
});

module.exports = router;
