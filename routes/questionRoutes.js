const express = require('express');
const router = express.Router();
const questionService = require('../services/questionService');

// Route: Create a new question
router.post('/', async (req, res) => {
  try {
    const { questionText, questionType, questionGroup } = req.body;

    // Validate request body
    if (!questionText || !questionType || !questionGroup) {
      return res.status(400).json({ error: 'All question fields are required.' });
    }

    // Call the service to create a question
    const question = await questionService.createQuestion(
      questionText, 
      questionType, 
      questionGroup
    );

    res.status(201).json(question);
  } catch (err) {
    console.error('Error creating question:', err.message);
    res.status(500).json({ error: 'Failed to create question.' });
  }
});

// Route: Get all questions
router.get('/', async (req, res) => {
  try {
    // Call the service to fetch all questions
    const questions = await questionService.getAllQuestions();
    res.json(questions);
  } catch (err) {
    console.error('Error fetching questions:', err.message);
    res.status(500).json({ error: 'Failed to fetch questions.' });
  }
});

// Route: Get a question by ID
router.get('/:id', async (req, res) => {
  try {
    // Call the service to fetch a question by ID
    const question = await questionService.getQuestionById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found.' });
    }
    res.json(question);
  } catch (err) {
    console.error('Error fetching question:', err.message);
    res.status(500).json({ error: 'Failed to fetch question.' });
  }
});

module.exports = router;
