const express = require('express');
const cors = require('cors'); // Import CORS
require('dotenv').config(); // Load environment variables

// Import routes
const authRoutes = require('./routes/auth'); // Authentication routes
const userRoutes = require('./routes/user'); // User routes
const patientResponsesRoutes = require('./routes/patientResponsesRoutes'); // Patient responses route
const gptRecommendationsRoutes = require('./routes/gptRecommendationRoutes'); // GPT recommendations route

const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend origin
  credentials: true, // Allow cookies, tokens, etc.
  allowedHeaders: ['Authorization', 'Content-Type'], // Allow necessary headers
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/user', userRoutes); // User routes
app.use('/api/responses', patientResponsesRoutes); // Patient responses route
app.use('/api/recommendations', gptRecommendationsRoutes); // GPT recommendations route

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
