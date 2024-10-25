const express = require('express');
const jwt = require('jsonwebtoken');
const { getUserDiagnoses, createDiagnosis, getDiagnosisById } = require('../models/Diagnosis'); 
const { getChatsByDiagnosisId } = require('../models/Chat');
const router = express.Router();
require('dotenv').config();

// Route to create a new diagnosis
router.post('/new', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const report = JSON.stringify(req.body); // Convert form data to JSON
    console.log('Creating new diagnosis for user:', userId);

    const diagnosis = await createDiagnosis(userId, report); // Store in DB
    console.log('New diagnosis created:', diagnosis);

    res.status(201).json(diagnosis);
  } catch (error) {
    console.error('Error creating diagnosis:', error.message);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }
    res.status(500).json({ message: 'Failed to create diagnosis.' });
  }
});

// Route to get all diagnoses for a user along with chat data
router.get('/user/reports', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const diagnoses = await getUserDiagnoses(userId);

    const sessions = await Promise.all(
      diagnoses.map(async (diagnosis) => {
        const chats = await getChatsByDiagnosisId(diagnosis.id);
        return { 
          sessionId: diagnosis.id, // Explicitly set sessionId
          ...diagnosis, 
          chat: chats.length ? chats[0] : null 
        }; 
      })
    );

    res.json(sessions);
  } catch (error) {
    console.error('Error fetching reports:', error.message);
    res.status(500).json({ message: 'Failed to fetch reports.' });
  }
});

// Route to get a specific diagnosis by ID (useful for detailed view)
router.get('/:id', async (req, res) => {
  try {
    const diagnosis = await getDiagnosisById(req.params.id);

    if (!diagnosis) {
      return res.status(404).json({ message: 'Diagnosis not found.' });
    }

    const chats = await getChatsByDiagnosisId(req.params.id); // Fetch chats for this diagnosis
    res.json({ diagnosis, chats }); // Return both diagnosis and chats
  } catch (error) {
    console.error('Error fetching diagnosis:', error.message);
    res.status(500).json({ message: 'Failed to fetch diagnosis.' });
  }
});

module.exports = router;
