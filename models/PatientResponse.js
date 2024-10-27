const pool = require('../config/dbConfig');

// Create a new patient response
const createPatientResponse = async (userId, symptoms) => {
  const result = await pool.query(
    'INSERT INTO tcm_app_schema.patient_responses (user_id, symptoms) VALUES ($1, $2) RETURNING *',
    [userId, JSON.stringify(symptoms)]
  );
  return result.rows[0];
};

module.exports = { createPatientResponse };
