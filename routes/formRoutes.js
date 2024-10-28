const express = require('express');
const router = express.Router();
const formService = require('../services/formService');

// Route to handle form submission
router.post('/submit-form', async (req, res) => {
  try {
    const { userId, formType, responses } = req.body;

    if (!userId || !formType || !responses || responses.length === 0) {
      return res.status(400).json({ error: 'All form fields are required.' });
    }

    const result = await formService.processFormSubmission(userId, formType, responses);

    res.status(201).json({
      message: 'Form submitted successfully.',
      formId: result.formId,
      diagnosis: result.diagnosisText,
      recommendations: result.recommendationText,
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Failed to submit form.' });
  }
});

// Route to get a specific form with responses, diagnosis, and recommendations
router.get('/:id', async (req, res) => {
  try {
    const formDetails = await formService.getFormDetails(req.params.id);
    if (!formDetails) return res.status(404).json({ error: 'Form not found.' });

    res.json(formDetails);
  } catch (error) {
    console.error('Error retrieving form:', error);
    res.status(500).json({ error: 'Failed to retrieve form.' });
  }
});

// Route to get all forms for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const forms = await formService.getFormsByUserId(req.params.userId);
    res.json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ error: 'Failed to fetch forms.' });
  }
});

module.exports = router;
