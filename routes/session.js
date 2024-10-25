const express = require('express');
const { getDiagnosisById } = require('../models/Diagnosis'); // Ensure correct import
const { getChatsByDiagnosisId } = require('../models/Chat'); // Import Chat model
const router = express.Router();

// Route to fetch session details
router.get('/session/:id', async (req, res) => {
  try {
    const diagnosisId = req.params.id;

    // Fetch diagnosis
    const diagnosis = await getDiagnosisById(diagnosisId);
    if (!diagnosis) {
      return res.status(404).json({ message: 'Diagnosis not found.' });
    }

    // Fetch chat messages related to this diagnosis
    const chats = await getChatsByDiagnosisId(diagnosisId);

    res.status(200).json({ diagnosis, chats });
  } catch (error) {
    console.error('Error fetching session details:', error.message);
    res.status(500).json({ message: 'Failed to fetch session details.' });
  }
});

module.exports = router;
