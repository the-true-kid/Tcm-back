const Question = require('../models/question');

// Service: Create a new question
const createQuestion = async (questionText, questionType, questionGroup) => {
  try {
    return await Question.create(questionText, questionType, questionGroup);
  } catch (error) {
    console.error('Error in questionService:', error.message);
    throw new Error('Failed to create question.');
  }
};

// Service: Get all questions
const getAllQuestions = async () => {
  try {
    return await Question.findAll();
  } catch (error) {
    console.error('Error in questionService:', error.message);
    throw new Error('Failed to fetch questions.');
  }
};

// Service: Get a question by ID
const getQuestionById = async (id) => {
  try {
    return await Question.findById(id);
  } catch (error) {
    console.error('Error in questionService:', error.message);
    throw new Error('Failed to fetch question.');
  }
};

module.exports = { createQuestion, getAllQuestions, getQuestionById };
