const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const testRoutes = require('./routes/test');
const diagnosisRoutes = require('./routes/diagnosis');
require('dotenv').config();

app.use(express.json());

// Routes
app.use('/api', testRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/diagnosis', diagnosisRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
