const Diagnosis = require('../models/Diagnosis');
const responseAnalyzer = require('./responseAnalyzer');

// Service: Generate diagnosis based on form responses
const getDiagnosis = async (responses) => {
  const patterns = responses.map(({ question, answer }) =>
    responseAnalyzer.analyzeResponse(question, answer)
  );

  const aggregated = aggregateDiagnosis(patterns);
  const diagnosisText = aggregated.join(', ');

  return { diagnosisText, recommendations: aggregated };
};

// Service: Aggregate diagnosis patterns into the top 3
const aggregateDiagnosis = (patterns) => {
  const counts = {};

  // Flatten the patterns array and count occurrences
  patterns.flat().forEach(({ energy, organ }) => {
    const key = `${energy} in ${organ}`;
    counts[key] = (counts[key] || 0) + 1;
  });

  // Sort and return the top 3 diagnoses
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => key);
};

// Service: Save diagnosis to the database
const createDiagnosis = async (formId, diagnosisText) => {
  try {
    return await Diagnosis.create(formId, diagnosisText);
  } catch (error) {
    console.error('Error creating diagnosis:', error.message);
    throw new Error('Failed to create diagnosis.');
  }
};

// Service: Get diagnosis by ID
const getDiagnosisById = async (id) => {
  try {
    const diagnosis = await Diagnosis.findById(id);
    if (!diagnosis) throw new Error('Diagnosis not found');
    return diagnosis;
  } catch (error) {
    console.error('Error fetching diagnosis:', error.message);
    throw new Error('Failed to fetch diagnosis.');
  }
};

module.exports = { getDiagnosis, createDiagnosis, getDiagnosisById };
