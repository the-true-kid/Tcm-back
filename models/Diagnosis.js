const client = require('../config/dbConfig'); // Import the PostgreSQL client

const Diagnosis = {
  // Create a new diagnosis
  create: async (form_id, diagnosis_text) => {
    const query = 'INSERT INTO diagnoses (form_id, diagnosis_text) VALUES ($1, $2) RETURNING *';
    const values = [form_id, diagnosis_text];
    const res = await client.query(query, values);
    return res.rows[0]; // Return the newly created diagnosis
  },

  // Get all diagnoses
  getAll: async () => {
    const res = await client.query('SELECT * FROM diagnoses');
    return res.rows; // Return all diagnoses
  },

  // Get a specific diagnosis by ID
  getById: async (id) => {
    const query = 'SELECT * FROM diagnoses WHERE id = $1';
    const values = [id];
    const res = await client.query(query, values);
    return res.rows[0]; // Return the diagnosis with the specified ID
  },

  // Update a diagnosis
  update: async (id, form_id, diagnosis_text) => {
    const query = 'UPDATE diagnoses SET form_id = $1, diagnosis_text = $2 WHERE id = $3 RETURNING *';
    const values = [form_id, diagnosis_text, id];
    const res = await client.query(query, values);
    return res.rows[0]; // Return the updated diagnosis
  },

  // Delete a diagnosis
  delete: async (id) => {
    const query = 'DELETE FROM diagnoses WHERE id = $1 RETURNING *';
    const values = [id];
    const res = await client.query(query, values);
    return res.rows[0]; // Return the deleted diagnosis
  },
};

module.exports = Diagnosis;
