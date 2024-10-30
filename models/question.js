// models/Question.js

const db = require('../config/dbConfig'); // Import the database connection

// Define the Question model
const Question = {
  // Method to create the questions table
  createTable: async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS questions (
        id SERIAL PRIMARY KEY,
        question_text VARCHAR NOT NULL,
        question_type VARCHAR NOT NULL,
        question_group VARCHAR,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    try {
      await db.query(query);
      console.log('Questions table created successfully.');
    } catch (error) {
      console.error('Error creating questions table:', error.message);
      throw new Error('Failed to create questions table.');
    }
  },

  // You can add additional methods as needed, such as for retrieving data
};

module.exports = Question;
