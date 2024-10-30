// models/FormResponse.js

const db = require('../config/dbConfig'); // Import your database connection

// Function to create a new form response
const createResponse = async (formId, questionId, answer) => {
  const query = `
    INSERT INTO form_responses (form_id, question_id, answer)
    VALUES ($1, $2, $3)
    RETURNING id;
  `;
  const values = [formId, questionId, answer];

  const result = await db.query(query, values);
  return result.rows[0].id; // Return the new response ID
};

// Function to bulk create form responses
const bulkCreateResponses = async (responses) => {
  const query = `
    INSERT INTO form_responses (form_id, question_id, answer)
    VALUES ${responses.map((_, index) => `($1, $${index * 3 + 2}, $${index * 3 + 3})`).join(', ')}
    RETURNING id;
  `;

  const values = responses.flatMap(response => [response.form_id, response.question_id, response.answer]);

  const result = await db.query(query, values);
  return result.rows; // Return all newly created response IDs
};

// Function to get all responses by form ID
const getResponsesByFormId = async (formId) => {
  const query = `
    SELECT r.*, q.question_text
    FROM form_responses r
    JOIN questions q ON r.question_id = q.id
    WHERE r.form_id = $1;
  `;
  const values = [formId];

  const result = await db.query(query, values);
  return result.rows; // Return all responses along with question text
};

module.exports = {
  createResponse,
  bulkCreateResponses,
  getResponsesByFormId,
};
