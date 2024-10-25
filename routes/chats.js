const express = require('express');
const axios = require('axios');
const { createChat } = require('../models/Chat'); // Import Chat model
const { getDiagnosisById } = require('../models/Diagnosis'); // Ensure correct import
require('dotenv').config();

const router = express.Router();

// Route to generate TCM diagnosis using OpenAI and save chat data
router.post('/tcm-diagnosis', async (req, res) => {
  try {
    const { diagnosisId } = req.body;

    // Fetch the diagnosis report from the database
    const diagnosis = await getDiagnosisById(diagnosisId);
    if (!diagnosis) {
      console.error(`Diagnosis not found for ID: ${diagnosisId}`);
      return res.status(404).json({ message: 'Diagnosis not found.' });
    }

    const prompt = `
      Analyze the following diagnosis from a Traditional Chinese Medicine perspective:
      ${diagnosis.diagnosis_report}
      Provide the following sections:
      1. Summary of the diagnosis
      2. Conceptual information (TCM principles related to the diagnosis)
      3. Dietary recommendations
      4. Herbal recommendations
      5. Lifestyle recommendations
    `;

    // Call the OpenAI API with the prompt
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const rawContent = response.data.choices[0].message.content;

    // Parse the response content into structured sections
    const [summary, conceptual, dietary, herbal, lifestyle] = rawContent.split('\n\n').map(s => s.trim());

    const chatContent = {
      summary,
      conceptualInfo: conceptual,
      dietaryRecommendations: dietary,
      herbalRecommendations: herbal,
      lifestyleRecommendations: lifestyle,
    };

    // Save the structured chat content in the chat table
    const chat = await createChat(diagnosis.user_id, diagnosisId, JSON.stringify(chatContent));

    res.status(201).json({ chat: chatContent });
  } catch (error) {
    console.error('Error in TCM diagnosis route:', error.message || error.response?.data);
    res.status(500).json({ message: 'Failed to process TCM diagnosis.' });
  }
});

module.exports = router;
