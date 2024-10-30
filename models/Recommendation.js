const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // Import Sequelize instance

const Recommendation = sequelize.define(
  'Recommendation',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    form_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'forms', // Reference to the forms table
        key: 'id',
      },
    },
    recommendation_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'recommendations',
    schema: 'tcm_app_schema', // Use your schema
    timestamps: false, // Disable timestamps if not needed
  }
);

module.exports = Recommendation;
