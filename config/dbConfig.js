const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres',
    schema: 'tcm_app_schema', // Default schema
    pool: {
      max: 10,
      min: 0,
      idle: 30000,
      acquire: 2000,
    },
    logging: console.log, // Optional: Log SQL queries for debugging
  }
);

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize connected to the database successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
