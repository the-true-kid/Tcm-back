const express = require('express');
const router = express.Router();
const diagnosisService = require('../services/diagnosisService'); // Import service

// Route: Create a new diagnosis
router.post('/', async (req, res) => {
  try {
    const { formId, diagnosisText } = req.body;

    // Validate request body
    if (!formId || !diagnosisText) {
      return res.status(400).json({ error: 'Form ID and diagnosis text are required.' });
    }

    // Call the service to create a diagnosis
    const diagnosis = await diagnosisService.createDiagnosis(formId, diagnosisText);
    res.status(201).json(diagnosis);
  } catch (error) {
    console.error('Error creating diagnosis:', error.message);
    res.status(500).json({ error: 'Failed to create diagnosis.' });
  }
});

// Route: Get diagnosis by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch diagnosis by ID
    const diagnosis = await diagnosisService.getDiagnosisById(id);

    if (!diagnosis) {
      return res.status(404).json({ error: 'Diagnosis not found.' });
    }

    res.json(diagnosis);
  } catch (error) {
    console.error('Error fetching diagnosis:', error.message);
    res.status(500).json({ error: 'Failed to fetch diagnosis.' });
  }
});

module.exports = router;
