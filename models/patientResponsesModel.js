const pool = require('../config/dbConfig');

// Save patient responses
const savePatientResponses = async (responses) => {
  const query = `
    INSERT INTO tcm_app_schema.patient_responses (
      form_id, user_id, overall_feeling, chronic_illness, 
      chronic_illness_duration, chronic_illness_effects, 
      mental_health_challenges, mental_health_treatment, 
      sleep_issues, sleep_hours, appetite, cravings, 
      digestive_issues, pain_description, pain_location, 
      pain_type, lifestyle, environment_sensitivity, created_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, 
      $9, $10, $11, $12, $13, $14, $15, 
      $16, $17, $18, NOW()
    ) RETURNING *;
  `;

  const values = [
    responses.form_id,
    responses.user_id,
    responses.overall_feeling,
    responses.chronic_illness,
    responses.chronic_illness_duration,
    responses.chronic_illness_effects,
    responses.mental_health_challenges,
    responses.mental_health_treatment,
    responses.sleep_issues,
    responses.sleep_hours,
    responses.appetite,
    responses.cravings,
    responses.digestive_issues,
    responses.pain_description,
    responses.pain_location,
    responses.pain_type,
    responses.lifestyle,
    responses.environment_sensitivity,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// Retrieve patient responses by user ID
const getPatientResponsesByUserId = async (userId) => {
  const query = `
    SELECT * FROM tcm_app_schema.patient_responses 
    WHERE user_id = $1 
    ORDER BY created_at DESC;
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

module.exports = { savePatientResponses, getPatientResponsesByUserId };
