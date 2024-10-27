const pool = require('../config/dbConfig');

const User = {
  async create(username, email) {
    const query = `
      INSERT INTO users (username, email) 
      VALUES ($1, $2) 
      RETURNING *`;
    const { rows } = await pool.query(query, [username, email]);
    return rows[0];
  },

  async findById(userId) {
    const query = `SELECT * FROM users WHERE user_id = $1`;
    const { rows } = await pool.query(query, [userId]);
    return rows[0];
  },

  async findAll() {
    const query = `SELECT * FROM users`;
    const { rows } = await pool.query(query);
    return rows;
  }
};

module.exports = User;
