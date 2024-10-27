const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth'); // Auth routes
const userRoutes = require('./routes/user'); // User routes
const patientResponsesRoutes = require('./routes/patientRoutes'); // Patient responses (renamed for clarity)
const diagnosisRoutes = require('./routes/diagnosisRoutes'); // New route for diagnosis & recommendations

const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Adjust if needed for production
  credentials: true,
  allowedHeaders: ['Authorization', 'Content-Type'],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware to parse JSON request bodies
app.use(express.json());

// Test route to verify the server
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/responses', patientResponsesRoutes); // For patient responses and diagnosis
app.use('/api/diagnosis', diagnosisRoutes); // For fetching diagnosis & recommendations

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
