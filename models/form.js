const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

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
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'form_responses',
    schema: 'tcm_app_schema',
    timestamps: false,
  }
);

module.exports = FormResponse;
