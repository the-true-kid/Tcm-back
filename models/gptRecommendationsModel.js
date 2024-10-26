const pool = require('../config/dbConfig');

// Save GPT recommendations
const saveGptRecommendations = async (recommendation) => {
  const query = `
    INSERT INTO tcm_app_schema.gpt_recommendations (
      form_id, diagnosis, food_recommendations, 
      herbal_recommendations, lifestyle_recommendations, 
      user_id, created_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, NOW()
    ) RETURNING *;
  `;

  const values = [
    recommendation.form_id,
    recommendation.diagnosis,
    recommendation.food_recommendations,
    recommendation.herbal_recommendations,
    recommendation.lifestyle_recommendations,
    recommendation.user_id
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// Retrieve GPT recommendations by user ID
const getGptRecommendationsByUserId = async (userId) => {
  const query = `
    SELECT * FROM tcm_app_schema.gpt_recommendations 
    WHERE user_id = $1 
    ORDER BY created_at DESC;
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

module.exports = { saveGptRecommendations, getGptRecommendationsByUserId };
