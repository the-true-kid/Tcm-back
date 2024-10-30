const express = require('express');
const router = express.Router();
const formService = require('../services/formService'); // Import the service

// Route: Submit a form
router.post('/submit-form', async (req, res) => {
  try {
    const { userId, formType, responses } = req.body;

    // Validate request payload
    if (!userId || !formType || !responses || responses.length === 0) {
      return res.status(400).json({ error: 'All form fields are required.' });
    }

    // Process form submission through the service layer
    const result = await formService.processFormSubmission(userId, formType, responses);

    // Send a success response with form details
    res.status(201).json({
      message: 'Form submitted successfully.',
      formId: result.formId,
      diagnosis: result.diagnosisText,
      recommendations: result.recommendationText,
    });
  } catch (error) {
    console.error('Error submitting form:', error.message);
    res.status(500).json({ error: 'Failed to submit form.' });
  }
});

// Route: Get details of a specific form by ID (with responses, diagnosis, and recommendations)
router.get('/:id', async (req, res) => {
  try {
    const formDetails = await formService.getFormDetails(req.params.id);

    if (!formDetails) {
      return res.status(404).json({ error: 'Form not found.' });
    }

    res.json(formDetails);
  } catch (error) {
    console.error('Error retrieving form:', error.message);
    res.status(500).json({ error: 'Failed to retrieve form.' });
  }
});

// Route: Get all forms for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const forms = await formService.getFormsByUserId(req.params.userId);

    res.json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error.message);
    res.status(500).json({ error: 'Failed to fetch forms.' });
  }
});

module.exports = router;
