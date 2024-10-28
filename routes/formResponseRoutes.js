const express = require('express');
const router = express.Router();
const formResponseService = require('../services/formResponseService');

// Route: Create a new form response
router.post('/', async (req, res) => {
  try {
    const { formId, questionId, answer } = req.body;
    const response = await formResponseService.createResponse(formId, questionId, answer);
    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating response:', error);
    res.status(500).json({ error: 'Failed to create response.' });
  }
});

// Route: Get all responses for a specific form
router.get('/form/:formId', async (req, res) => {
  try {
    const responses = await formResponseService.getResponsesByFormId(req.params.formId);
    res.json(responses);
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ error: 'Failed to fetch responses.' });
  }
});

module.exports = router;
