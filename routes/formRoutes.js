const express = require('express');
const router = express.Router();
const Form = require('../models/form');

// Create a new form
router.post('/', async (req, res) => {
  try {
    const { userId, formType } = req.body;
    const form = await Form.create(userId, formType);
    res.status(201).json(form);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all forms for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const forms = await Form.findByUserId(req.params.userId);
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a form by ID
router.get('/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ error: 'Form not found' });
    res.json(form);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
