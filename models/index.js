const User = require('./User');
const Diagnosis = require('./Diagnosis');

// Define Relationships
// Example: One user can have many diagnoses
Diagnosis.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Diagnosis, { foreignKey: 'user_id' });

// Export Models
module.exports = { User, Diagnosis };
