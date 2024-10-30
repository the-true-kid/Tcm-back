const Question = require('../models/Question'); // Import the Sequelize model

// Service: Create a new question
const createQuestion = async (questionText, questionType, questionGroup) => {
  try {
    const question = await Question.create({
      question_text: questionText,
      question_type: questionType,
      question_group: questionGroup,
    });
    return question;
  } catch (error) {
    console.error('Error in questionService:', error.message);
    throw new Error('Failed to create question.');
  }
};

// Service: Get all questions
const getAllQuestions = async () => {
  try {
    const questions = await Question.findAll();
    return questions;
  } catch (error) {
    console.error('Error in questionService:', error.message);
    throw new Error('Failed to fetch questions.');
  }
};

// Service: Get a question by ID
const getQuestionById = async (id) => {
  try {
    const question = await Question.findByPk(id); // Primary key lookup
    if (!question) {
      throw new Error('Question not found.');
    }
    return question;
  } catch (error) {
    console.error('Error in questionService:', error.message);
    throw new Error('Failed to fetch question.');
  }
};

module.exports = { createQuestion, getAllQuestions, getQuestionById };
