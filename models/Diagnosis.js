const pool = require('../config/dbConfig');

// Save a diagnosis
const createDiagnosis = async (userId, summary) => {
  const result = await pool.query(
    'INSERT INTO tcm_app_schema.diagnoses (user_id, diagnosis_summary) VALUES ($1, $2) RETURNING *',
    [userId, summary]
  );
  return result.rows[0];
};

// Get a diagnosis by user ID
const getDiagnosisByUserId = async (userId) => {
    const result = await pool.query(
      'SELECT * FROM tcm_app_schema.diagnoses WHERE user_id = $1',
      [userId]
    );
    return result.rows[0]; // Return the diagnosis or undefined
  };
  

module.exports = { createDiagnosis, getDiagnosisByUserId };
