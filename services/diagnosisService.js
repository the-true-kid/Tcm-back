const responseAnalyzer = require('./responseAnalyzer');

const getDiagnosis = async (responses) => {
  const patterns = responses.map(({ question, answer }) =>
    responseAnalyzer.analyzeResponse(question, answer)
  );

  const aggregated = aggregateDiagnosis(patterns);
  const diagnosisText = aggregated.join(', ');

  return { diagnosisText, recommendations: aggregated };
};

const aggregateDiagnosis = (patterns) => {
  const counts = {};
  patterns.flat().forEach(({ energy, organ }) => {
    const key = `${energy} in ${organ}`;
    counts[key] = (counts[key] || 0) + 1;
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3) // Top 3 diagnoses
    .map(([key]) => key);
};

module.exports = { getDiagnosis };
