const express = require('express');
const router = express.Router();
const formResponseService = require('../services/formResponseService');

// Route: Create a new form response
router.post('/', async (req, res) => {
  try {
    const { formId, questionId, answer } = req.body;

    // Validate request body
    if (!formId || !questionId || !answer) {
      return res.status(400).json({ error: 'Form ID, question ID, and answer are required.' });
    }

    // Call the service to create the response
    const response = await formResponseService.createResponse(formId, questionId, answer);
    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating response:', error.message);
    res.status(500).json({ error: 'Failed to create response.' });
  }
});

// Route: Bulk create form responses
router.post('/bulk', async (req, res) => {
  try {
    const { responses } = req.body;

    // Validate that responses are provided
    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      return res.status(400).json({ error: 'A valid array of responses is required.' });
    }

    // Call the service to bulk create responses
    const createdResponses = await formResponseService.bulkCreateResponses(responses);
    res.status(201).json(createdResponses);
  } catch (error) {
    console.error('Error creating responses in bulk:', error.message);
    res.status(500).json({ error: 'Failed to create responses in bulk.' });
  }
});

// Route: Get all responses for a specific form
router.get('/form/:formId', async (req, res) => {
  try {
    const responses = await formResponseService.getResponsesByFormId(req.params.formId);

    // If no responses are found, return a 404
    if (!responses || responses.length === 0) {
      return res.status(404).json({ error: 'No responses found for the specified form.' });
    }

    res.json(responses);
  } catch (error) {
    console.error('Error fetching responses:', error.message);
    res.status(500).json({ error: 'Failed to fetch responses.' });
  }
});

module.exports = router;
