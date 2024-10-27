const express = require('express');
const { getDiagnosisByUserId } = require('../models/Diagnosis');
const { getRecommendationsByDiagnosisId } = require('../models/Recommendation');
const router = express.Router();

// GET /api/diagnosis/:userId - Get diagnosis and recommendations by user ID
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Step 1: Get the diagnosis for the user
    const diagnosis = await getDiagnosisByUserId(userId);

    if (!diagnosis) {
      return res.status(404).json({ message: 'Diagnosis not found for this user' });
    }

    // Step 2: Get the recommendations for the diagnosis
    const recommendations = await getRecommendationsByDiagnosisId(diagnosis.diagnosis_id);

    // Step 3: Respond with the diagnosis and recommendations
    res.json({
      diagnosis: diagnosis.diagnosis_summary,
      recommendations,
    });
  } catch (error) {
    console.error('Error fetching diagnosis and recommendations:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
