const express = require('express');
const router = express.Router();
const recommendationService = require('../services/recommendationService');

// Route to create a new recommendation
router.post('/', async (req, res) => {
  try {
    const { formId, recommendationText } = req.body;

    if (!formId || !recommendationText) {
      return res.status(400).json({ error: 'Form ID and recommendation text are required.' });
    }

    const recommendation = await recommendationService.createRecommendation(formId, recommendationText);
    res.status(201).json(recommendation);
  } catch (error) {
    console.error('Error creating recommendation:', error.message);
    res.status(500).json({ error: 'Failed to create recommendation.' });
  }
});

// Route to get recommendation by ID
router.get('/:id', async (req, res) => {
  try {
    const recommendation = await recommendationService.getRecommendationById(req.params.id);
    if (!recommendation) return res.status(404).json({ error: 'Recommendation not found.' });

    res.json(recommendation);
  } catch (error) {
    console.error('Error fetching recommendation:', error.message);
    res.status(500).json({ error: 'Failed to fetch recommendation.' });
  }
});

module.exports = router;
