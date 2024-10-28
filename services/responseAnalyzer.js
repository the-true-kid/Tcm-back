const analyzeResponse = (question, answer) => {
  const patterns = [];

  // Fatigue-related questions
  if (question.includes('fatigue')) {
    if (answer.includes('Often')) patterns.push({ energy: 'Qi Deficiency', organ: 'Spleen', weight: 2 });
    if (answer.includes('Always')) patterns.push({ energy: 'Qi Deficiency', organ: 'Lung', weight: 3 });
  }

  // Temperature sensitivity
  if (question.includes('cold')) patterns.push({ energy: 'Yang Deficiency', organ: 'Kidney', weight: 2 });
  if (question.includes('hot')) patterns.push({ energy: 'Yin Deficiency', organ: 'Heart', weight: 2 });

  // Emotional health
  if (question.includes('stress') && answer.includes('High')) {
    patterns.push({ energy: 'Qi Stagnation', organ: 'Liver', weight: 3 });
  }

  if (question.includes('appetite') && answer.includes('Poor')) {
    patterns.push({ energy: 'Qi Deficiency', organ: 'Spleen', weight: 1 });
  }

  return patterns;
};

module.exports = { analyzeResponse };
