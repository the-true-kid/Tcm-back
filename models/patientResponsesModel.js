// models/patientResponsesModel.js
const pool = require('../config/dbConfig');

// Save patient responses
const savePatientResponses = async (userId, responses) => {
  const query = `
    INSERT INTO patient_responses (
      user_id, overall_feeling, chronic_illness, chronic_illness_duration,
      chronic_illness_effects, sleep_issues, sleep_hours, appetite, cravings, digestive_issues
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
  `;

  const values = [
    userId, responses.overallFeeling, responses.chronicIllness,
    responses.chronicIllnessDuration, responses.chronicIllnessEffects,
    responses.sleepIssues, responses.sleepHours, responses.appetite,
    responses.cravings, responses.digestiveIssues
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// Retrieve patient responses by user ID
const getPatientResponsesByUserId = async (userId) => {
  const query = `
    SELECT * FROM patient_responses WHERE user_id = $1 ORDER BY created_at DESC;
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

module.exports = { savePatientResponses, getPatientResponsesByUserId };
