const Recommendation = require('../models/Recommendation'); // Sequelize model
const { aggregateDiagnosis } = require('../utils/diagnosisUtils'); // Utility function

// TCM recommendations data
const recommendations = {
  'Qi Deficiency in Spleen': {
    mild: {
      diet: 'Eat warm, easily digestible foods like porridge.',
      lifestyle: 'Take regular breaks and avoid stress.',
      mental: 'Practice mindfulness to conserve energy.'
    },
    severe: {
      diet: 'Consume nourishing soups with ginger and chicken.',
      lifestyle: 'Limit mental activity and rest often.',
      mental: 'Engage in restorative activities like meditation.'
    }
  },
  'Yang Deficiency in Kidney': {
    mild: {
      diet: 'Eat warming foods like cinnamon and nuts.',
      lifestyle: 'Stay warm, especially in the lower back.',
      mental: 'Engage in gentle physical activities.'
    },
    severe: {
      diet: 'Consume bone broth and avoid cold foods.',
      lifestyle: 'Use heat therapy on the back.',
      mental: 'Avoid overexertion and focus on grounding exercises.'
    }
  },
  'Liver Qi Stagnation': {
    mild: {
      diet: 'Incorporate sour foods like lemon and dandelion greens.',
      lifestyle: 'Engage in physical activities like yoga or dancing.',
      mental: 'Use journaling to express emotions and reduce tension.'
    },
    severe: {
      diet: 'Consume herbs like milk thistle to detox the liver.',
      lifestyle: 'Incorporate regular exercise to release tension.',
      mental: 'Practice breathing exercises to reduce anger.'
    }
  }
};

// Analyze responses to generate diagnosis patterns
const analyzeResponse = (question, answer) => {
  const patterns = [];

  if (question.includes('fatigue')) {
    if (answer.includes('Often')) patterns.push({ diagnosis: 'Qi Deficiency in Spleen', severity: 'mild' });
    if (answer.includes('Always')) patterns.push({ diagnosis: 'Qi Deficiency in Spleen', severity: 'severe' });
  }

  if (question.includes('cold')) patterns.push({ diagnosis: 'Yang Deficiency in Kidney', severity: 'mild' });
  if (question.includes('hot')) patterns.push({ diagnosis: 'Yin Deficiency in Heart', severity: 'mild' });

  if (question.includes('stress') && answer.includes('High')) {
    patterns.push({ diagnosis: 'Liver Qi Stagnation', severity: 'severe' });
  }

  return patterns;
};

// Format recommendations based on diagnosis patterns
const formatRecommendations = (diagnoses) => {
  const final = { diet: new Set(), lifestyle: new Set(), mental: new Set() };

  diagnoses.forEach(({ diagnosis, severity }) => {
    const rec = recommendations[diagnosis]?.[severity] || {};

    if (rec.diet) final.diet.add(rec.diet);
    if (rec.lifestyle) final.lifestyle.add(rec.lifestyle);
    if (rec.mental) final.mental.add(rec.mental);
  });

  return {
    diet: Array.from(final.diet).join(' '),
    lifestyle: Array.from(final.lifestyle).join(' '),
    mental: Array.from(final.mental).join(' ')
  };
};

// Save recommendations to the database
const saveRecommendations = async (formId, recommendationsText) => {
  try {
    const recommendationText = `
      **Diet:** ${recommendationsText.diet}
      **Lifestyle:** ${recommendationsText.lifestyle}
      **Mental Health:** ${recommendationsText.mental}
    `;

    return await Recommendation.create({
      form_id: formId,
      recommendation_text: recommendationText
    });
  } catch (error) {
    console.error('Error saving recommendations:', error.message);
    throw new Error('Failed to save recommendations.');
  }
};

// Bulk save recommendations (if needed)
const saveBulkRecommendations = async (formId, recommendations) => {
  try {
    const formattedRecommendations = recommendations.map((text) => ({
      form_id: formId,
      recommendation_text: text
    }));

    return await Recommendation.bulkCreate(formattedRecommendations);
  } catch (error) {
    console.error('Error saving bulk recommendations:', error.message);
    throw new Error('Failed to save bulk recommendations.');
  }
};

// Get recommendation by ID
const getRecommendationById = async (id) => {
  try {
    const recommendation = await Recommendation.findByPk(id);
    if (!recommendation) throw new Error('Recommendation not found');
    return recommendation;
  } catch (error) {
    console.error('Error fetching recommendation:', error.message);
    throw new Error('Failed to fetch recommendation.');
  }
};

module.exports = {
  analyzeResponse,
  formatRecommendations,
  saveRecommendations,
  saveBulkRecommendations,
  getRecommendationById
};
