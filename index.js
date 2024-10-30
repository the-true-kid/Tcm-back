const express = require('express');
const cors = require('cors');
const pool = require('./config/dbConfig'); // Use the exported pool instance
require('dotenv').config(); // Load environment variables

// Import route files
const authRoutes = require('./routes/auth'); 
const userRoutes = require('./routes/user'); 
const formRoutes = require('./routes/formRoutes'); 
const formResponseRoutes = require('./routes/formResponseRoutes'); 
const questionRoutes = require('./routes/questionRoutes'); 
const diagnosisRoutes = require('./routes/diagnosisRoutes'); 
const recommendationRoutes = require('./routes/recommendationRoutes'); 

const app = express(); 

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true,
  allowedHeaders: ['Authorization', 'Content-Type'],
};

app.use(cors(corsOptions)); 
app.use(express.json()); 

// Test route
app.get('/ping', (req, res) => res.status(200).send('pong'));

// Mount routes
app.use('/api/auth', authRoutes); 
app.use('/api/user', userRoutes); 
app.use('/api/forms', formRoutes); 
app.use('/api/responses', formResponseRoutes); 
app.use('/api/questions', questionRoutes); 
app.use('/api/diagnosis', diagnosisRoutes); 
app.use('/api/recommendations', recommendationRoutes); 

// Start the server
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    // Test the database connection
    await pool.connect();
    console.log('Database connected successfully.');

    // Start the server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Graceful shutdown of the pool
let poolClosed = false; // Flag to track pool closure

process.on('SIGINT', async () => {
  if (!poolClosed) {
    await pool.end();
    console.log('Database connection closed.');
    poolClosed = true; // Set the flag to true to prevent multiple calls
  }
  process.exit(0);
});
