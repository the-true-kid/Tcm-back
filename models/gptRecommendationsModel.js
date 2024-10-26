// models/gptRecommendationsModel.js
const pool = require('../config/dbConfig');

// Save ChatGPT recommendations
const saveGptRecommendations = async (userId, recommendations) => {
  const query = `
    INSERT INTO gpt_recommendations (
      user_id, diagnosis, food_recommendations, herbal_recommendations, lifestyle_recommendations
    ) VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [
    userId, recommendations.diagnosis, recommendations.foodRecommendations,
    recommendations.herbalRecommendations, recommendations.lifestyleRecommendations
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// Retrieve GPT recommendations by user ID
const getGptRecommendationsByUserId = async (userId) => {
  const query = `
    SELECT * FROM gpt_recommendations WHERE user_id = $1 ORDER BY created_at DESC;
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

module.exports = { saveGptRecommendations, getGptRecommendationsByUserId };
