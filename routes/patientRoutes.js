const express = require('express');
const { createPatientResponse } = require('../models/PatientResponse');
const { createDiagnosis } = require('../models/Diagnosis');
const { generateDiagnosis, generateRecommendations } = require('../services/diagnosisService');
const router = express.Router();

// POST /api/patient-response - Handle patient response
router.post('/response', async (req, res) => {
  const { userId, symptoms } = req.body;

  try {
    // Step 1: Save the patient response
    const response = await createPatientResponse(userId, symptoms);
    console.log('Patient response saved:', response);

    // Step 2: Generate the diagnosis
    const diagnosisSummary = generateDiagnosis(symptoms);
    const diagnosis = await createDiagnosis(userId, diagnosisSummary);
    console.log('Diagnosis generated:', diagnosis);

    // Step 3: Generate recommendations based on the diagnosis
    await generateRecommendations(diagnosis.diagnosis_id, diagnosisSummary);

    res.status(201).json({
      message: 'Response, diagnosis, and recommendations saved successfully.',
      diagnosis,
    });
  } catch (error) {
    console.error('Error processing patient response:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
