const pool = require('../config/dbConfig');

const createDiagnosis = async (userId, report) => {
  const result = await pool.query(
    'INSERT INTO diagnoses (user_id, diagnosis_report) VALUES ($1, $2) RETURNING *',
    [userId, report]
  );
  return result.rows[0];
};

const getUserDiagnoses = async (userId) => {
  const result = await pool.query(
    'SELECT * FROM diagnoses WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
};

module.exports = { createDiagnosis, getUserDiagnoses };
