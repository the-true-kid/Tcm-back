// services/formService.js

const Form = require('../models/Form');
const FormResponse = require('../models/FormResponse');
const Diagnosis = require('../models/Diagnosis');
const Recommendation = require('../models/Recommendation');
const { analyzeResponse, aggregateDiagnosis } = require('../utils/diagnosisUtils');
const recommendationService = require('./recommendationService');

// Service: Process form submission
const processFormSubmission = async (userId, formType, responses) => {
  try {
    // Create a new form entry
    const formId = await Form.createForm(userId, formType); // Use the new createForm method

    // Analyze responses to generate diagnostic patterns
    const patterns = responses.flatMap(({ question, answer }) =>
      analyzeResponse(question, answer)
    );

    // Aggregate diagnostic patterns into a final diagnosis
    const aggregatedDiagnosis = aggregateDiagnosis(patterns);

    // Format recommendations based on the diagnosis
    const diagnoses = aggregatedDiagnosis.map(({ diagnosis, weight }) =>
      `${diagnosis}: ${weight >= 3 ? 'severe' : 'mild'}`
    );
    const formattedRecommendations = recommendationService.formatRecommendations(diagnoses);

    // Save form responses in bulk
    await saveResponses(formId, responses);

    // Save the diagnosis to the database
    const diagnosisText = aggregatedDiagnosis.map(({ diagnosis }) => diagnosis).join(', ');
    await Diagnosis.create(formId, diagnosisText); // Update this based on your new Diagnosis model

    // Save the recommendations to the database
    await recommendationService.saveRecommendations(formId, formattedRecommendations);

    // Return the final result
    return {
      formId,
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
    await FormResponse.bulkCreate(formattedResponses); // Update this based on your raw SQL model
  } catch (error) {
    console.error('Error saving form responses:', error.message);
    throw new Error('Failed to save form responses.');
  }
};

// Service: Get details of a specific form
const getFormDetails = async (formId) => {
  try {
    const form = await Form.getFormById(formId); // Use the new getFormById method
    if (!form) return null;

    const responses = await FormResponse.getByFormId(formId); // Update this based on your raw SQL model
    const diagnosis = await Diagnosis.getByFormId(formId); // Update this based on your raw SQL model
    const recommendation = await Recommendation.getByFormId(formId); // Update this based on your raw SQL model

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
    const forms = await Form.getFormsByUserId(userId); // Use the new getFormsByUserId method
    return forms;
  } catch (error) {
    console.error('Error fetching forms for user:', error.message);
    throw new Error('Failed to fetch forms.');
  }
};

module.exports = {
  processFormSubmission,
  getFormDetails,
  getFormsByUserId,
};
