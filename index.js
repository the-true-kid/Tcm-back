const express = require('express');
const cors = require('cors');
require('dotenv').config(); 

// Import route files
const authRoutes = require('./routes/auth'); 
const userRoutes = require('./routes/user'); 
const formRoutes = require('./routes/formRoutes'); // Form Routes
const formResponseRoutes = require('./routes/formResponseRoutes'); // Form Response Routes
const questionRoutes = require('./routes/questionRoutes'); 
const diagnosisRoutes = require('./routes/diagnosisRoutes'); 

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
app.use('/api/forms', formRoutes); // Form Routes
app.use('/api/responses', formResponseRoutes); // Form Response Routes
app.use('/api/questions', questionRoutes); 
app.use('/api/diagnosis', diagnosisRoutes); 

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
