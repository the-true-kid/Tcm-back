const express = require('express');
const router = express.Router();
const diagnosisService = require('../services/diagnosisService');

// Route to create a new diagnosis
router.post('/', async (req, res) => {
  try {
    const { formId, diagnosisText } = req.body;

    if (!formId || !diagnosisText) {
      return res.status(400).json({ error: 'Form ID and diagnosis text are required.' });
    }

    const diagnosis = await diagnosisService.createDiagnosis(formId, diagnosisText);
    res.status(201).json(diagnosis);
  } catch (error) {
    console.error('Error creating diagnosis:', error.message);
    res.status(500).json({ error: 'Failed to create diagnosis.' });
  }
});

// Route to get diagnosis by ID
router.get('/:id', async (req, res) => {
  try {
    const diagnosis = await diagnosisService.getDiagnosisById(req.params.id);
    res.json(diagnosis);
  } catch (error) {
    console.error('Error fetching diagnosis:', error.message);
    res.status(500).json({ error: 'Failed to fetch diagnosis.' });
  }
});

module.exports = router;
