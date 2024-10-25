// tcmChat.js
const OpenAI = require('openai'); // Use CommonJS syntax
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getTCMChatResponse = async (diagnosisReport) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a TCM expert.' },
        { role: 'user', content: `Analyze this report: ${diagnosisReport}` },
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw new Error('Failed to get TCM response.');
  }
};

module.exports = { getTCMChatResponse };
