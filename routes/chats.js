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
      Provide a summary and recommendations for lifestyle, food, and herbal remedies.
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

    const chatContent = response.data.choices[0].message.content;

    // Save the generated chat content in the chat table
    const chat = await createChat(diagnosis.user_id, diagnosisId, chatContent);

    res.status(201).json({ chat });
  } catch (error) {
    console.error('Error in TCM diagnosis route:', error.message || error.response?.data);
    res.status(500).json({ message: 'Failed to process TCM diagnosis.' });
  }
});

module.exports = router;
