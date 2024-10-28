const analyzeResponse = (question, answer) => {
    const patterns = [];
  
    if (question.includes('fatigue')) {
      if (answer.includes('Often')) patterns.push({ energy: 'Qi Deficiency', organ: 'Spleen' });
      if (answer.includes('Always')) patterns.push({ energy: 'Qi Deficiency', organ: 'Lung' });
    }
  
    if (question.includes('hot')) patterns.push({ energy: 'Yin Deficiency', organ: 'Heart' });
    if (question.includes('cold')) patterns.push({ energy: 'Yang Deficiency', organ: 'Kidney' });
  
    return patterns;
  };
  
  module.exports = { analyzeResponse };
  