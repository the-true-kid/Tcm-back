const { createDiagnosis } = require('../models/Diagnosis');
const { createRecommendation } = require('../models/Recommendation');

// Logic to determine diagnosis based on symptoms
const generateDiagnosis = (symptoms) => {
  if (symptoms.includes('fatigue') && symptoms.includes('dry mouth')) {
    return 'Qi Deficiency with Dampness';
  } else if (symptoms.includes('headache') && symptoms.includes('stress')) {
    return 'Liver Qi Stagnation';
  } else {
    return 'Unknown Condition - Please consult a practitioner.';
  }
};

// Generate recommendations based on diagnosis
const generateRecommendations = async (diagnosisId, diagnosis) => {
  const recommendationsMap = {
    'Qi Deficiency with Dampness': [
      'Drink ginger tea.',
      'Eat warming foods like congee.',
      'Practice light qigong.'
    ],
    'Liver Qi Stagnation': [
      'Practice breathing exercises.',
      'Drink chrysanthemum tea.',
      'Reduce stress through meditation.'
    ],
    'Unknown Condition - Please consult a practitioner.': [
      'Consult a licensed TCM practitioner for further advice.'
    ]
  };

  const recommendations = recommendationsMap[diagnosis] || [];
  for (const text of recommendations) {
    await createRecommendation(diagnosisId, text);
  }
};

module.exports = { generateDiagnosis, generateRecommendations };
