const analyzeResponse = (question, answer) => {
  const patterns = [];

  if (question.includes('fatigue')) {
    if (answer.includes('Often')) patterns.push('Qi Deficiency in Spleen');
    if (answer.includes('Always')) patterns.push('Qi Deficiency in Lung');
  }

  if (question.includes('hot')) patterns.push('Yin Deficiency in Heart');
  if (question.includes('cold')) patterns.push('Yang Deficiency in Kidney');

  if (question.includes('stress') && answer.includes('High')) {
    patterns.push('Liver Qi Stagnation');
  }

  if (question.includes('appetite') && answer.includes('Poor')) {
    patterns.push('Qi Deficiency in Spleen');
  }

  return patterns;
};

module.exports = { analyzeResponse };
