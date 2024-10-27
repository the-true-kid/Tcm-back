const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation');

// Create a new recommendation
router.post('/', async (req, res) => {
  try {
    const { formId, recommendationText } = req.body;
    const recommendation = await Recommendation.create(formId, recommendationText);
    res.status(201).json(recommendation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get recommendation by ID
router.get('/:id', async (req, res) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id);
    if (!recommendation) return res.status(404).json({ error: 'Recommendation not found' });
    res.json(recommendation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
