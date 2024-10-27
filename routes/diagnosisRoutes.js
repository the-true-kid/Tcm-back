const express = require('express');
const router = express.Router();
const Diagnosis = require('../models/Diagnosis');

// Create a new diagnosis
router.post('/', async (req, res) => {
  try {
    const { formId, diagnosisText } = req.body;
    const diagnosis = await Diagnosis.create(formId, diagnosisText);
    res.status(201).json(diagnosis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get diagnosis by ID
router.get('/:id', async (req, res) => {
  try {
    const diagnosis = await Diagnosis.findById(req.params.id);
    if (!diagnosis) return res.status(404).json({ error: 'Diagnosis not found' });
    res.json(diagnosis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
