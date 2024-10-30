const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // Import Sequelize instance

// Define the Question model
const Question = sequelize.define(
  'Question',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question_group: {
      type: DataTypes.STRING,
      allowNull: true, // Can be nullable
    },
  },
  {
    tableName: 'questions', // Ensure this matches your database table name
    schema: 'tcm_app_schema', // Use correct schema
    timestamps: false, // Set to false if your table doesn't track createdAt/updatedAt
  }
);

module.exports = Question;
