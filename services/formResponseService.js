const FormResponse = require('../models/FormResponse');
const Question = require('../models/Question'); // For eager loading of questions

// Service: Create a new form response
const createResponse = async (formId, questionId, answer) => {
  try {
    const response = await FormResponse.create({
      form_id: formId,
      question_id: questionId,
      answer,
    });
    return response;
  } catch (error) {
    console.error('Error in formResponseService:', error.message);
    throw new Error('Failed to create response.');
  }
};

// Service: Bulk create form responses
const bulkCreateResponses = async (responses) => {
  try {
    const createdResponses = await FormResponse.bulkCreate(responses);
    return createdResponses;
  } catch (error) {
    console.error('Error in formResponseService (bulk create):', error.message);
    throw new Error('Failed to create responses in bulk.');
  }
};

// Service: Get all responses by form ID
const getResponsesByFormId = async (formId) => {
  try {
    const responses = await FormResponse.findAll({
      where: { form_id: formId },
      include: [{ model: Question, attributes: ['question_text'] }], // Eager load related questions
    });

    return responses;
  } catch (error) {
    console.error('Error in formResponseService (get by form ID):', error.message);
    throw new Error('Failed to fetch responses.');
  }
};

module.exports = { 
  createResponse, 
  bulkCreateResponses, 
  getResponsesByFormId 
};
