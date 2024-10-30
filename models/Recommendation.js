// models/Recommendation.js

const db = require('../config/dbConfig'); // Import the database connection

// Define the Recommendation model
const Recommendation = {
  // Method to create the recommendations table
  createTable: async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS recommendations (
        id SERIAL PRIMARY KEY,
        form_id INT NOT NULL REFERENCES forms(id),
        recommendation_text TEXT NOT NULL
      );
    `;
    try {
      await db.query(query);
      console.log('Recommendations table created successfully.');
    } catch (error) {
      console.error('Error creating recommendations table:', error.message);
      throw new Error('Failed to create recommendations table.');
    }
  },

  // Method to save a recommendation
  saveRecommendation: async (formId, recommendationText) => {
    const query = `
      INSERT INTO recommendations (form_id, recommendation_text)
      VALUES ($1, $2) RETURNING *;
    `;
    try {
      const result = await db.query(query, [formId, recommendationText]);
      return result.rows[0]; // Return the created recommendation
    } catch (error) {
      console.error('Error saving recommendation:', error.message);
      throw new Error('Failed to save recommendation.');
    }
  },

  // Method to fetch a recommendation by ID
  getRecommendationById: async (id) => {
    const query = `
      SELECT * FROM recommendations WHERE id = $1;
    `;
    try {
      const result = await db.query(query, [id]);
      if (result.rows.length === 0) throw new Error('Recommendation not found');
      return result.rows[0]; // Return the recommendation
    } catch (error) {
      console.error('Error fetching recommendation:', error.message);
      throw new Error('Failed to fetch recommendation.');
    }
  }
};

module.exports = Recommendation;
