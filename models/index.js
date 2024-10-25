// models/index.js
const User = require('./User');        // Import User model
const Diagnosis = require('./Diagnosis'); // Import Diagnosis model
const Chat = require('./Chat');         // Import Chat model

// Define Relationships

// A User can have many Diagnoses
User.hasMany(Diagnosis, { foreignKey: 'user_id' });
Diagnosis.belongsTo(User, { foreignKey: 'user_id' });

// A User can have many Chats
User.hasMany(Chat, { foreignKey: 'user_id' });
Chat.belongsTo(User, { foreignKey: 'user_id' });

// A Diagnosis can have many Chats
Diagnosis.hasMany(Chat, { foreignKey: 'diagnosis_id' });
Chat.belongsTo(Diagnosis, { foreignKey: 'diagnosis_id' });

// Export Models
module.exports = { User, Diagnosis, Chat };
