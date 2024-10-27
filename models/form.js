const pool = require('../config/dbConfig');

const Form = {
  // Create a new form
  async create(userId, formType) {
    const query = `
      INSERT INTO tcm_app_schema.forms (user_id, form_type) 
      VALUES ($1, $2) 
      RETURNING *`;
    const { rows } = await pool.query(query, [userId, formType]);
    return rows[0];
  },

  // Fetch all forms for a user
  async findByUserId(userId) {
    const query = `SELECT * FROM tcm_app_schema.forms WHERE user_id = $1`;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  },

  // Fetch a specific form by ID
  async findById(id) {
    const query = `SELECT * FROM tcm_app_schema.forms WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
};

module.exports = Form;
