const express = require('express');
const cors = require('cors'); // Import CORS at the top
require('dotenv').config(); // Load environment variables

const authRoutes = require('./routes/auth');
const diagnosisRoutes = require('./routes/diagnosis');
const userRoutes = require('./routes/user'); 

const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend origin
  credentials: true, // Allow cookies, tokens, etc.
  allowedHeaders: ['Authorization', 'Content-Type'], // Allow necessary headers
};

// Apply CORS middleware at the top
app.use(cors(corsOptions));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/diagnosis', diagnosisRoutes); // Diagnosis routes
app.use('/api/user', userRoutes); // User routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
