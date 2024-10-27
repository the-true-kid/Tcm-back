const pool = require('../config/dbConfig');

const Response = {
  async create(formId, question, answer) {
    const query = `
      INSERT INTO form_responses (form_id, question, answer) 
      VALUES ($1, $2, $3)`;
    await pool.query(query, [formId, question, answer]);
  }
};

module.exports = Response;
