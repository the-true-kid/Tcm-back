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

// Get forms by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const forms = await Form.findByUser(req.params.userId);
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
