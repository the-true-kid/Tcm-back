const express = require('express');
const router = express.Router();
const pool = require('../config/dbConfig');  // Use the correct file name
const validateColumns = require('../utils/validateColumns');

// Allowed columns for validation
const allowedColumnsGPT = [
  'id', 'form_id', 'diagnosis',
  'food_recommendations', 'herbal_recommendations',
  'lifestyle_recommendations', 'created_at', 'user_id'
];

// GET route for GPT Recommendations with dynamic column selection
router.get('/', async (req, res) => {
  try {
    // Parse the requested columns or default to '*'
    const fields = req.query.fields ? req.query.fields.split(',') : ['*'];

    // Validate the requested columns
    if (fields[0] !== '*' && !validateColumns(fields, allowedColumnsGPT)) {
      return res.status(400).json({ error: 'Invalid column name provided' });
    }

    // Join columns for the SQL query
    const columns = fields.join(', ');

    // Prepare and execute the SQL query
    const query = `SELECT ${columns} FROM tcm_app_schema.gpt_recommendations`;
    const { rows } = await pool.query(query);

    // Send the result as JSON response
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching recommendations:', err.message);

    // Return a more user-friendly error message
    res.status(500).json({ error: 'An error occurred while fetching recommendations.' });
  }
});

module.exports = router;
