const pool = require('../config/dbConfig');

const Question = {
  // Create a new question
  async create(questionText, questionType, questionGroup) {
    const query = `
      INSERT INTO tcm_app_schema.questions (question_text, question_type, question_group) 
      VALUES ($1, $2, $3) 
      RETURNING *`;
    const { rows } = await pool.query(query, [questionText, questionType, questionGroup]);
    return rows[0];
  },

  // Fetch all questions
  async findAll() {
    const query = `SELECT * FROM tcm_app_schema.questions`;
    const { rows } = await pool.query(query);
    return rows;
  },

  // Fetch a question by ID
  async findById(id) {
    const query = `SELECT * FROM tcm_app_schema.questions WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
};

module.exports = Question;
