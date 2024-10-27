const pool = require('../config/dbConfig');

const Recommendation = {
  async create(formId, recommendationText) {
    const query = `
      INSERT INTO recommendations (form_id, recommendation_text) 
      VALUES ($1, $2) 
      RETURNING *`;
    const { rows } = await pool.query(query, [formId, recommendationText]);
    return rows[0];
  },

  async findById(id) {
    const query = `SELECT * FROM recommendations WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
};

module.exports = Recommendation;
