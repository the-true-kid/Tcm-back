const express = require('express');
const router = express.Router();
const axios = require('axios');
const pool = require('../config/dbConfig');
const { saveGptRecommendations } = require('../models/gptRecommendationsModel');

// Helper function to retrieve patient responses from the database
const getPatientResponsesByFormId = async (formId) => {
  const query = `
    SELECT * FROM tcm_app_schema.patient_responses 
    WHERE form_id = $1;
  `;
  const result = await pool.query(query, [formId]);
  return result.rows[0]; // Assuming one response per form
};

// POST route to generate GPT recommendations
router.post('/generate', async (req, res) => {
  try {
    const { formId, userId } = req.body; // Get form ID and user ID from the request

    // Step 1: Retrieve patient responses from the database using form_id
    const patientResponses = await getPatientResponsesByFormId(formId);

    if (!patientResponses) {
      return res.status(404).json({ error: 'Patient responses not found.' });
    }

    // Step 2: Call GPT API with the patient responses
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

    // Step 3: Parse GPT's response
    const { food_recommendations, herbal_recommendations, lifestyle_recommendations } = gptResponse.data.choices[0].text
      ? JSON.parse(gptResponse.data.choices[0].text)
      : {};

    // Step 4: Save GPT recommendations to the database
    const recommendationData = {
      form_id: formId,
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
