const Diagnosis = require('../models/Diagnosis'); // Import raw SQL model
const responseAnalyzer = require('./responseAnalyzer'); // Logic for analyzing responses
const { aggregateDiagnosis } = require('../utils/diagnosisUtils'); // Utility function

// Service: Generate diagnosis based on form responses
const getDiagnosis = async (responses) => {
  try {
    // Analyze responses and aggregate diagnosis patterns
    const patterns = responses.map(({ question, answer }) =>
      responseAnalyzer.analyzeResponse(question, answer)
    );

    const aggregated = aggregateDiagnosis(patterns); // Use the utility function
    const diagnosisText = aggregated.join(', ');

    return { diagnosisText, recommendations: aggregated };
  } catch (error) {
    console.error('Error generating diagnosis:', error.message);
    throw new Error('Failed to generate diagnosis.');
  }
};

// Service: Create a new diagnosis in the database
const createDiagnosis = async (formId, diagnosisText) => {
  try {
    const diagnosis = await Diagnosis.create(formId, diagnosisText); // Use raw SQL method
    return diagnosis;
  } catch (error) {
    console.error('Error creating diagnosis:', error.message);
    throw new Error('Failed to create diagnosis.');
  }
};

// Service: Fetch diagnosis by ID
const getDiagnosisById = async (id) => {
  try {
    const diagnosis = await Diagnosis.getById(id); // Use raw SQL method
    if (!diagnosis) throw new Error('Diagnosis not found');
    return diagnosis;
  } catch (error) {
    console.error('Error fetching diagnosis:', error.message);
    throw new Error('Failed to fetch diagnosis.');
  }
};

module.exports = { getDiagnosis, createDiagnosis, getDiagnosisById };
