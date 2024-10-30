const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // Use updated Sequelize config

const User = sequelize.define(
  'User',
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    schema: 'tcm_app_schema', // Set schema correctly
    timestamps: false, // Only use timestamps if your table includes them
  }
);

module.exports = User;
