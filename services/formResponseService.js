const FormResponse = require('../models/formResponse');

// Service: Create a new form response
const createResponse = async (formId, questionId, answer) => {
  try {
    return await FormResponse.create(formId, questionId, answer);
  } catch (error) {
    console.error('Error in formResponseService:', error.message);
    throw new Error('Failed to create response.');
  }
};

// Service: Get all responses by form ID
const getResponsesByFormId = async (formId) => {
  try {
    return await FormResponse.findByFormId(formId);
  } catch (error) {
    console.error('Error in formResponseService:', error.message);
    throw new Error('Failed to fetch responses.');
  }
};

module.exports = { createResponse, getResponsesByFormId };
