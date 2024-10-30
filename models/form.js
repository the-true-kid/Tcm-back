// models/Form.js

const db = require('../config/dbConfig'); // Import your database connection

// Function to create a form
const createForm = async (userId, formType) => {
  const query = `
    INSERT INTO forms (user_id, form_type, created_at)
    VALUES ($1, $2, NOW())
    RETURNING id;
  `;
  const values = [userId, formType];

  const result = await db.query(query, values);
  return result.rows[0].id; // Return the new form ID
};

// Function to fetch a form by ID
const getFormById = async (formId) => {
  const query = `
    SELECT * FROM forms WHERE id = $1;
  `;
  const values = [formId];

  const result = await db.query(query, values);
  return result.rows[0]; // Return the form data
};

// Function to fetch all forms by user ID
const getFormsByUserId = async (userId) => {
  const query = `
    SELECT * FROM forms WHERE user_id = $1;
  `;
  const values = [userId];

  const result = await db.query(query, values);
  return result.rows; // Return all forms
};

module.exports = {
  createForm,
  getFormById,
  getFormsByUserId,
};
