const express = require('express');
const router = express.Router();
const FormResponse = require('../models/formResponse');

// Create a new form response
router.post('/', async (req, res) => {
  try {
    const { formId, questionId, answer } = req.body;
    const response = await FormResponse.create(formId, questionId, answer);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all responses for a specific form
router.get('/form/:formId', async (req, res) => {
  try {
    const responses = await FormResponse.findByFormId(req.params.formId);
    res.json(responses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
