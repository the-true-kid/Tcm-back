// services/questionService.js

const db = require('../config/dbConfig'); // Import your database connection

// Service: Create a new question
const createQuestion = async (questionText, questionType, questionGroup) => {
  const query = `
    INSERT INTO questions (question_text, question_type, question_group, created_at)
    VALUES ($1, $2, $3, NOW())
    RETURNING id;
  `;
  const values = [questionText, questionType, questionGroup];

  try {
    const result = await db.query(query, values);
    return result.rows[0]; // Return the created question
  } catch (error) {
    console.error('Error in questionService (create):', error.message);
    throw new Error('Failed to create question.');
  }
};

// Service: Get all questions
const getAllQuestions = async () => {
  const query = `
    SELECT * FROM questions;
  `;

  try {
    const result = await db.query(query);
    return result.rows; // Return all questions
  } catch (error) {
    console.error('Error in questionService (get all):', error.message);
    throw new Error('Failed to fetch questions.');
  }
};

// Service: Get a question by ID
const getQuestionById = async (id) => {
  const query = `
    SELECT * FROM questions WHERE id = $1;
  `;
  const values = [id];

  try {
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
      throw new Error('Question not found.');
    }
    return result.rows[0]; // Return the found question
  } catch (error) {
    console.error('Error in questionService (get by ID):', error.message);
    throw new Error('Failed to fetch question.');
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
};
