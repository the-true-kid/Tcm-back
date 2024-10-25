const express = require('express');
const { getDiagnosisById } = require('../models/Diagnosis');
const { getChatsByDiagnosisId } = require('../models/Chat'); 
const router = express.Router();

// Utility function to fetch diagnosis and chat details
const fetchSessionDetails = async (sessionId) => {
  const diagnosis = await getDiagnosisById(sessionId);
  const chats = await getChatsByDiagnosisId(sessionId);
  
  if (!diagnosis) {
    throw new Error('Session not found.');
  }

  return { diagnosis, chats };
};

// Route to get details of a specific session
router.get('/:sessionId', async (req, res) => {
  const sessionId = req.params.sessionId; // Use sessionId from params
  try {
    const sessionData = await fetchSessionDetails(sessionId); // Fetch details using the utility function
    res.json(sessionData); // Send back both diagnosis and associated chat data
  } catch (error) {
    console.error('Error fetching session details:', error.message);
    res.status(404).json({ message: error.message }); // Return the error message
  }
});

module.exports = router;
