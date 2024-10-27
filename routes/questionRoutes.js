const express = require('express');
const router = express.Router();
const Question = require('../models/question');

// Create a new question
router.post('/', async (req, res) => {
  try {
    const { questionText, questionType, questionGroup } = req.body;
    const question = await Question.create(questionText, questionType, questionGroup);
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a question by ID
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
