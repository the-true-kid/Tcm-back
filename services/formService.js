const Form = require('../models/form');
const FormResponse = require('../models/formResponse');
const Diagnosis = require('../models/Diagnosis');
const Recommendation = require('../models/Recommendation');
const diagnosisService = require('./diagnosisService');
const recommendationService = require('./recommendationService');

// Service: Process form submission
const processFormSubmission = async (userId, formType, responses) => {
  try {
    // Step 1: Create the form entry in the database
    const form = await Form.create(userId, formType);

    // Step 2: Generate diagnosis based on form responses
    const diagnosisResults = await diagnosisService.getDiagnosis(responses);
    const { diagnosisText, recommendations } = diagnosisResults;

    // Step 3: Save responses to the database
    await saveResponses(form.id, responses);

    // Step 4: Save diagnosis in the database
    await Diagnosis.create(form.id, diagnosisText);

    // Step 5: Format and save recommendations in the database
    const formattedRecommendations = recommendationService.formatRecommendations(recommendations);
    await recommendationService.saveRecommendations(form.id, formattedRecommendations, Recommendation);

    // Step 6: Return results to the caller
    return {
      formId: form.id,
      diagnosisText,
      recommendationText: formattedRecommendations,
    };
  } catch (error) {
    console.error('Error processing form submission:', error.message);
    throw new Error('Form submission failed.');
  }
};

// Helper: Save responses in bulk
const saveResponses = async (formId, responses) => {
  try {
    const formattedResponses = responses.map(({ question, answer }) => ({
      form_id: formId,
      question,
      answer,
    }));
    await FormResponse.bulkCreate(formattedResponses);
  } catch (error) {
    console.error('Error saving form responses:', error.message);
    throw new Error('Failed to save form responses.');
  }
};

module.exports = { processFormSubmission };
