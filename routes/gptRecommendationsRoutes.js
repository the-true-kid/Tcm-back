const express = require('express');
const router = express.Router();
const axios = require('axios');
const pool = require('../config/dbConfig');
const { saveGptRecommendations } = require('../models/gptRecommendationsModel');

// Helper function to retrieve patient responses by form ID
const getPatientResponsesByFormId = async (formId) => {
  const query = `
    SELECT * FROM tcm_app_schema.patient_responses 
    WHERE form_id = $1;
  `;
  const result = await pool.query(query, [formId]);
  return result.rows[0]; // Assuming one response per form
};

// Helper function to create a new form if it doesn't exist
const createForm = async (userId, formName) => {
  const query = `
    INSERT INTO tcm_app_schema.forms (user_id, form_name, created_at)
    VALUES ($1, $2, NOW())
    RETURNING id;
  `;
  const result = await pool.query(query, [userId, formName]);
  return result.rows[0].id; // Return the generated form ID
};

// POST route to generate GPT recommendations
router.post('/generate', async (req, res) => {
  try {
    const { formId, userId, formName } = req.body;

    // Step 1: Check if the form exists; create it if not
    let actualFormId = formId;
    if (!formId) {
      console.log('Form ID not provided. Creating a new form...');
      actualFormId = await createForm(userId, formName);
      console.log(`New form created with ID: ${actualFormId}`);
    }

    // Step 2: Retrieve patient responses using the form ID
    const patientResponses = await getPatientResponsesByFormId(actualFormId);

    if (!patientResponses) {
      return res.status(404).json({ error: 'Patient responses not found.' });
    }

    // Step 3: Call GPT API with the patient responses
    const gptResponse = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: `Given the following patient data, generate food, herbal, and lifestyle recommendations:
        ${JSON.stringify(patientResponses)}`,
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Step 4: Parse GPT's response
    const { food_recommendations, herbal_recommendations, lifestyle_recommendations } = gptResponse.data.choices[0].text
      ? JSON.parse(gptResponse.data.choices[0].text)
      : {};

    // Step 5: Save GPT recommendations to the database
    const recommendationData = {
      form_id: actualFormId,
      user_id: userId,
      diagnosis: patientResponses.diagnosis || 'N/A',
      food_recommendations,
      herbal_recommendations,
      lifestyle_recommendations,
    };

    const savedRecommendation = await saveGptRecommendations(recommendationData);

    res.status(201).json(savedRecommendation);
  } catch (error) {
    console.error('Error generating GPT recommendations:', error);
    res.status(500).json({ error: 'Failed to generate GPT recommendations.' });
  }
});

module.exports = router;
