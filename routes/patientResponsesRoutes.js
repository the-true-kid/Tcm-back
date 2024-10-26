const express = require('express');
const router = express.Router();
const pool = require('../config/dbConfig'); // Ensure correct path to dbConfig
const {
  savePatientResponses,
  getPatientResponsesByUserId,
} = require('../models/patientResponsesModel');

// Helper to create a new form entry
const createForm = async (userId, formName) => {
  const query = `
    INSERT INTO tcm_app_schema.forms (user_id, form_name, created_at)
    VALUES ($1, $2, NOW())
    RETURNING id;
  `;
  const result = await pool.query(query, [userId, formName]);
  return result.rows[0].id; // Return the generated form ID
};

// POST route to create a new form and save patient responses
router.post('/new', async (req, res) => {
  try {
    const { userId, formName, responses } = req.body; // Extract data from request body
    console.log('Received Responses:', responses);

    // Check if required fields are present
    if (!userId || !responses.overallFeeling) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Step 1: Create a new form and get its ID
    const formId = await createForm(userId, formName);
    console.log(`Created new form with ID: ${formId}`);

    // Step 2: Save patient responses linked to the form
    const responseData = { form_id: formId, user_id: userId, ...responses };
    const savedResponse = await savePatientResponses(responseData);

    res.status(201).json({ formId, response: savedResponse });
  } catch (error) {
    console.error('Error saving form and responses:', error);
    res.status(500).json({ error: 'Failed to save form and responses.' });
  }
});

// GET route to retrieve patient responses by user ID
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const responses = await getPatientResponsesByUserId(userId);

    if (responses.length === 0) {
      return res.status(404).json({ error: 'No responses found for this user.' });
    }

    res.status(200).json(responses);
  } catch (error) {
    console.error('Error retrieving patient responses:', error);
    res.status(500).json({ error: 'Failed to retrieve patient responses.' });
  }
});

module.exports = router;
