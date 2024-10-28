const Recommendation = require('../models/Recommendation'); // Import the Recommendation model

const recommendations = {
  'Qi Deficiency in Spleen': {
    diet: 'Eat warm, easily digestible foods. Avoid cold foods.',
    lifestyle: 'Rest often and avoid overthinking.',
    mental: 'Practice mindfulness to reduce fatigue.'
  },
  'Yang Deficiency in Kidney': {
    diet: 'Eat warming foods like lamb. Avoid cold drinks.',
    lifestyle: 'Keep your back warm. Avoid cold exposure.',
    mental: 'Practice grounding exercises like yoga.'
  },
  'Liver Qi Stagnation': {
    diet: 'Incorporate sour foods like lemon and dandelion greens.',
    lifestyle: 'Engage in physical activities like yoga or dancing.',
    mental: 'Use journaling to express emotions and reduce tension.'
  },
  // Add more patterns here...
};

// Service: Format recommendations based on diagnoses
const formatRecommendations = (diagnoses) => {
  const final = { diet: new Set(), lifestyle: new Set(), mental: new Set() };

  diagnoses.forEach((diagnosis) => {
    const rec = recommendations[diagnosis];
    if (rec) {
      final.diet.add(rec.diet);
      final.lifestyle.add(rec.lifestyle);
      final.mental.add(rec.mental);
    } else {
      console.warn(`No recommendations found for: ${diagnosis}`);
    }
  });

  return {
    diet: Array.from(final.diet).join(' '),
    lifestyle: Array.from(final.lifestyle).join(' '),
    mental: Array.from(final.mental).join(' ')
  };
};

// Service: Save recommendations to the database
const saveRecommendations = async (formId, recommendationsText, RecommendationModel) => {
  try {
    const recommendationText = `
      **Diet:** ${recommendationsText.diet}
      **Lifestyle:** ${recommendationsText.lifestyle}
      **Mental Health:** ${recommendationsText.mental}
    `;

    return await RecommendationModel.create(formId, recommendationText);
  } catch (error) {
    console.error('Error saving recommendations:', error.message);
    throw new Error('Failed to save recommendations.');
  }
};

// Service: Create a new recommendation (for route call)
const createRecommendation = async (formId, recommendationText) => {
  try {
    return await Recommendation.create(formId, recommendationText);
  } catch (error) {
    console.error('Error creating recommendation:', error.message);
    throw new Error('Failed to create recommendation.');
  }
};

// Service: Get a recommendation by ID (for route call)
const getRecommendationById = async (id) => {
  try {
    const recommendation = await Recommendation.findById(id);
    if (!recommendation) throw new Error('Recommendation not found');
    return recommendation;
  } catch (error) {
    console.error('Error fetching recommendation:', error.message);
    throw new Error('Failed to fetch recommendation.');
  }
};

module.exports = { 
  formatRecommendations, 
  saveRecommendations, 
  createRecommendation, 
  getRecommendationById 
};
