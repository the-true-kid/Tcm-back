// models/Chat.js
const pool = require('../config/dbConfig'); // Import the database pool

// Create a new chat message
const createChat = async (userId, diagnosisId, messageContent) => {
  const result = await pool.query(
    `INSERT INTO chats (user_id, diagnosis_id, message_content) 
     VALUES ($1, $2, $3) 
     RETURNING *`,
    [userId, diagnosisId, messageContent]
  );
  return result.rows[0];
};

// Get all chat messages for a specific user
const getChatsByUserId = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM chats WHERE user_id = $1 ORDER BY timestamp DESC`,
    [userId]
  );
  return result.rows;
};

// Get all chat messages associated with a specific diagnosis
const getChatsByDiagnosisId = async (diagnosisId) => {
  const result = await pool.query(
    `SELECT * FROM chats WHERE diagnosis_id = $1 ORDER BY timestamp DESC`,
    [diagnosisId]
  );
  return result.rows;
};

// Delete a specific chat message by its ID
const deleteChatById = async (id) => {
  const result = await pool.query(
    `DELETE FROM chats WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0]; // Return the deleted row
};

module.exports = {
  createChat,
  getChatsByUserId,
  getChatsByDiagnosisId,
  deleteChatById,
};
