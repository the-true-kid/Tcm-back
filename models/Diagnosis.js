const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // Import Sequelize instance

const Diagnosis = sequelize.define(
  'Diagnosis',
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
        model: 'forms', // Ensure it matches the 'forms' table name
        key: 'id',
      },
    },
    diagnosis_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'diagnoses',
    schema: 'tcm_app_schema',
    timestamps: false, // Disable if your table doesn't track timestamps
  }
);

module.exports = Diagnosis;
