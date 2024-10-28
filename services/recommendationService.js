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
    'Heart Yin Deficiency': {
      diet: 'Eat cooling foods like watermelon and lotus root.',
      lifestyle: 'Reduce mental stimulation before bed to improve sleep.',
      mental: 'Practice relaxation techniques to calm the mind.'
    },
    'Blood Stasis in Liver': {
      diet: 'Consume foods that promote circulation, such as turmeric and garlic.',
      lifestyle: 'Incorporate gentle movement like qi gong.',
      mental: 'Try acupuncture or massage to release tension.'
    }
  };
  
  // Format recommendations based on diagnoses
  const formatRecommendations = (diagnoses) => {
    let final = { diet: [], lifestyle: [], mental: [] };
  
    diagnoses.forEach((diagnosis) => {
      const rec = recommendations[diagnosis];
  
      if (rec) {
        final.diet.push(rec.diet);
        final.lifestyle.push(rec.lifestyle);
        final.mental.push(rec.mental);
      } else {
        console.warn(`No recommendations found for: ${diagnosis}`);
      }
    });
  
    return {
      diet: final.diet.join(' '),
      lifestyle: final.lifestyle.join(' '),
      mental: final.mental.join(' ')
    };
  };
  
  // Save recommendations to the database
  const saveRecommendations = async (formId, recommendations, RecommendationModel) => {
    try {
      const recommendationText = `
        **Diet:** ${recommendations.diet}
        **Lifestyle:** ${recommendations.lifestyle}
        **Mental Health:** ${recommendations.mental}
      `;
  
      return await RecommendationModel.create(formId, recommendationText);
    } catch (error) {
      console.error('Error saving recommendations:', error.message);
      throw new Error('Failed to save recommendations.');
    }
  };
  
  module.exports = { formatRecommendations, saveRecommendations };
  