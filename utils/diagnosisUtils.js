// utils/diagnosisUtils.js

// Consolidated aggregateDiagnosis function
const aggregateDiagnosis = (patterns) => {
    const counts = {};
  
    // Aggregate weights based on diagnosis and severity
    patterns.forEach(({ diagnosis, severity }) => {
      const key = `${diagnosis}:${severity}`; // e.g., 'Qi Deficiency in Spleen:mild'
      counts[key] = (counts[key] || 0) + 1;  // Increment the weight
    });
  
    // Sort by weight and return the top 3 diagnoses
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])  // Sort by weight descending
      .slice(0, 3)  // Top 3 diagnoses
      .map(([key]) => key);  // Return only the keys (diagnosis:severity)
  };
  
  module.exports = { aggregateDiagnosis };
  