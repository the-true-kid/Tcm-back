const Diagnosis = require('../models/Diagnosis');
const responseAnalyzer = require('./responseAnalyzer');
const { aggregateDiagnosis } = require('../utils/diagnosisUtils');  // Import the utility

// Service: Generate diagnosis based on form responses
const getDiagnosis = async (responses) => {
  const patterns = responses.map(({ question, answer }) =>
    responseAnalyzer.analyzeResponse(question, answer)
  );

  const aggregated = aggregateDiagnosis(patterns);  // Use the utility function
  const diagnosisText = aggregated.join(', ');

  return { diagnosisText, recommendations: aggregated };
};

const createDiagnosis = async (formId, diagnosisText) => {
  try {
    return await Diagnosis.create(formId, diagnosisText);
  } catch (error) {
    console.error('Error creating diagnosis:', error.message);
    throw new Error('Failed to create diagnosis.');
  }
};

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
