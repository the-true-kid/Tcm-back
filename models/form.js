const pool = require('../config/dbConfig');

const Form = {
  async create(userId, formType) {
    const query = `
      INSERT INTO forms (user_id, form_type) 
      VALUES ($1, $2) 
      RETURNING *`;
    const { rows } = await pool.query(query, [userId, formType]);
    return rows[0];
  },

  async findById(formId) {
    const query = `SELECT * FROM forms WHERE id = $1`;
    const { rows } = await pool.query(query, [formId]);
    return rows[0];
  },

  async findByUser(userId) {
    const query = `SELECT * FROM forms WHERE user_id = $1`;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  }
};

module.exports = Form;
