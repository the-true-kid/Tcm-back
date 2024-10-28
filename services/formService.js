const Form = require('../models/form');
const FormResponse = require('../models/formResponse');
const Diagnosis = require('../models/Diagnosis');
const Recommendation = require('../models/Recommendation');
const diagnosisService = require('./diagnosisService');
const recommendationService = require('./recommendationService');

// Service: Process form submission
const processFormSubmission = async (userId, formType, responses) => {
  try {
    const form = await Form.create(userId, formType);

    const diagnosisResults = await diagnosisService.getDiagnosis(responses);
    const { diagnosisText, recommendations } = diagnosisResults;

    await saveResponses(form.id, responses);

    await Diagnosis.create(form.id, diagnosisText);

    const formattedRecommendations = recommendationService.formatRecommendations(recommendations);
    await recommendationService.saveRecommendations(form.id, formattedRecommendations, Recommendation);

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

// Service: Get details of a specific form
const getFormDetails = async (formId) => {
  try {
    const form = await Form.findById(formId);
    if (!form) return null;

    const responses = await FormResponse.findByFormId(formId);
    const diagnosis = await Diagnosis.findById(formId);
    const recommendation = await Recommendation.findById(formId);

    return {
      form,
      responses,
      diagnosis: diagnosis ? diagnosis.diagnosis_text : 'No diagnosis available.',
      recommendation: recommendation ? recommendation.recommendation_text : 'No recommendations available.',
    };
  } catch (error) {
    console.error('Error retrieving form details:', error.message);
    throw new Error('Failed to retrieve form details.');
  }
};

// Service: Get all forms for a specific user
const getFormsByUserId = async (userId) => {
  try {
    return await Form.findByUserId(userId);
  } catch (error) {
    console.error('Error fetching forms for user:', error.message);
    throw new Error('Failed to fetch forms.');
  }
};

module.exports = { 
  processFormSubmission, 
  getFormDetails, 
  getFormsByUserId 
};
