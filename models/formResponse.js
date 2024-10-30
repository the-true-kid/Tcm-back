const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // Import Sequelize instance

const FormResponse = sequelize.define(
  'FormResponse',
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
        model: 'forms',
        key: 'id',
      },
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'questions',
        key: 'id',
      },
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'form_responses',
    schema: 'tcm_app_schema',
    timestamps: false, // Disable if not using createdAt/updatedAt
  }
);

module.exports = FormResponse;
