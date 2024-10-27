const pool = require('../config/dbConfig');

// Save recommendations
const createRecommendation = async (diagnosisId, text) => {
  const result = await pool.query(
    'INSERT INTO tcm_app_schema.recommendations (diagnosis_id, recommendation_text) VALUES ($1, $2) RETURNING *',
    [diagnosisId, text]
  );
  return result.rows[0];
};

// Get recommendations by diagnosis ID
const getRecommendationsByDiagnosisId = async (diagnosisId) => {
    const result = await pool.query(
      'SELECT recommendation_text FROM tcm_app_schema.recommendations WHERE diagnosis_id = $1',
      [diagnosisId]
    );
    return result.rows.map((row) => row.recommendation_text); // Return all recommendations as an array
  };

module.exports = { createRecommendation, getRecommendationsByDiagnosisId };
