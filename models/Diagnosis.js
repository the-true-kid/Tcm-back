const pool = require('../config/dbConfig');

const Diagnosis = {
  async create(formId, diagnosisText) {
    const query = `
      INSERT INTO diagnoses (form_id, diagnosis_text) 
      VALUES ($1, $2) 
      RETURNING *`;
    const { rows } = await pool.query(query, [formId, diagnosisText]);
    return rows[0];
  },

  async findById(id) {
    const query = `SELECT * FROM diagnoses WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
};

module.exports = Diagnosis;
