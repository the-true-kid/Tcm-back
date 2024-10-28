const express = require('express');
const router = express.Router();
const diagnosisService = require('../services/diagnosisService');

// Route to create a new diagnosis (if needed separately)
router.post('/', async (req, res) => {
  try {
    const { formId, diagnosisText } = req.body;
    const diagnosis = await diagnosisService.createDiagnosis(formId, diagnosisText);
    res.status(201).json(diagnosis);
  } catch (error) {
    console.error('Error creating diagnosis:', error);
    res.status(500).json({ error: 'Failed to create diagnosis.' });
  }
});

// Route to get diagnosis by ID
router.get('/:id', async (req, res) => {
  try {
    const diagnosis = await diagnosisService.getDiagnosisById(req.params.id);
    if (!diagnosis) return res.status(404).json({ error: 'Diagnosis not found.' });
    res.json(diagnosis);
  } catch (error) {
    console.error('Error fetching diagnosis:', error);
    res.status(500).json({ error: 'Failed to fetch diagnosis.' });
  }
});

module.exports = router;
