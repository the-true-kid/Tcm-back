const analyzeResponse = (question, answer) => {
  const patterns = [];

  // Fatigue-related patterns
  if (question.includes('fatigue')) {
    if (answer.includes('Often')) patterns.push({ energy: 'Qi Deficiency', organ: 'Spleen', weight: 2 });
    if (answer.includes('Always')) patterns.push({ energy: 'Qi Deficiency', organ: 'Lung', weight: 3 });
  }

  // Temperature sensitivity patterns
  if (question.includes('cold')) patterns.push({ energy: 'Yang Deficiency', organ: 'Kidney', weight: 2 });
  if (question.includes('hot')) patterns.push({ energy: 'Yin Deficiency', organ: 'Heart', weight: 2 });

  // Emotional health patterns
  if (question.includes('stress') && answer.includes('High')) {
    patterns.push({ energy: 'Qi Stagnation', organ: 'Liver', weight: 3 });
  }

  // Appetite-related patterns
  if (question.includes('appetite') && answer.includes('Poor')) {
    patterns.push({ energy: 'Qi Deficiency', organ: 'Spleen', weight: 1 });
  }

  return patterns;
};

// Aggregate the diagnostic patterns
const aggregateDiagnosis = (patterns) => {
  const diagnosisMap = {};

  // Group patterns by diagnosis and sum their weights
  patterns.forEach(({ energy, organ, weight }) => {
    const key = `${energy} in ${organ}`;
    diagnosisMap[key] = (diagnosisMap[key] || 0) + weight;
  });

  // Convert the diagnosis map to an array of objects, sorted by weight
  return Object.entries(diagnosisMap)
    .map(([diagnosis, weight]) => ({ diagnosis, weight }))
    .sort((a, b) => b.weight - a.weight); // Sort by severity (higher weight first)
};

module.exports = { analyzeResponse, aggregateDiagnosis };
