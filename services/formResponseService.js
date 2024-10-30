// services/formResponseService.js

const FormResponse = require('../models/FormResponse');
const Question = require('../models/Question'); // If you still need this for other parts of your app

// Service: Create a new form response
const createResponse = async (formId, questionId, answer) => {
  try {
    return await FormResponse.createResponse(formId, questionId, answer); // Call the raw SQL function
  } catch (error) {
    console.error('Error creating response:', error.message);
    throw new Error('Failed to create response.');
  }
};

// Service: Bulk create form responses
const bulkCreateResponses = async (responses) => {
  try {
    return await FormResponse.bulkCreateResponses(responses); // Call the raw SQL function
  } catch (error) {
    console.error('Error bulk creating responses:', error.message);
    throw new Error('Failed to create responses in bulk.');
  }
};

// Service: Get all responses by form ID
const getResponsesByFormId = async (formId) => {
  try {
    return await FormResponse.getResponsesByFormId(formId); // Call the raw SQL function
  } catch (error) {
    console.error('Error fetching responses:', error.message);
    throw new Error('Failed to fetch responses.');
  }
};

module.exports = { 
  createResponse, 
  bulkCreateResponses, 
  getResponsesByFormId 
};
