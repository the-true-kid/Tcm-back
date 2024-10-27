const pool = require('../config/dbConfig');

const FormResponse = {
  // Create a new form response
  async create(formId, questionId, answer) {
    const query = `
      INSERT INTO tcm_app_schema.form_responses (form_id, question_id, answer) 
      VALUES ($1, $2, $3) 
      RETURNING *`;
    const { rows } = await pool.query(query, [formId, questionId, answer]);
    return rows[0];
  },

  // Fetch all responses for a specific form
  async findByFormId(formId) {
    const query = `
      SELECT fr.id, fr.answer, q.question_text 
      FROM tcm_app_schema.form_responses fr
      JOIN tcm_app_schema.questions q ON fr.question_id = q.id
      WHERE fr.form_id = $1`;
    const { rows } = await pool.query(query, [formId]);
    return rows;
  }
};

module.exports = FormResponse;
