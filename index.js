const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import route files
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const formRoutes = require('./routes/formRoutes');  // New form routes
const recommendationRoutes = require('./routes/recommendationRoutes');  // New recommendation routes
const diagnosisRoutes = require('./routes/diagnosisRoutes');  // Diagnosis routes

const app = express();  // Create Express app

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Authorization', 'Content-Type'],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware to parse JSON request bodies
app.use(express.json());

// Test route to verify server is running
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

// Mount routes under /api
app.use('/api/auth', authRoutes);                // Auth routes
app.use('/api/user', userRoutes);                // User routes
app.use('/api/forms', formRoutes);               // Form routes
app.use('/api/recommendations', recommendationRoutes);  // Recommendation routes
app.use('/api/diagnosis', diagnosisRoutes);      // Diagnosis routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
