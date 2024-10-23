const express = require('express');
const cors = require('cors'); // Import CORS
const authRoutes = require('./routes/auth');
const diagnosisRoutes = require('./routes/diagnosis');
const userRoutes = require('./routes/user'); // Import user routes
require('dotenv').config(); // Load environment variables

const app = express();

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from frontend
  credentials: true, // Allow credentials (cookies, tokens, etc.)
  allowedHeaders: ['Authorization', 'Content-Type'], // Allow necessary headers
};
app.use(cors(corsOptions));

app.use(express.json()); // Middleware to parse incoming JSON requests

// Routes
app.use('/api/auth', authRoutes); // Authentication routes (login, register)
app.use('/api/diagnosis', diagnosisRoutes); // Diagnosis-related routes
app.use('/api', userRoutes); // Protected user routes (e.g., /user)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
