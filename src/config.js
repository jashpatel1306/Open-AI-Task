require('dotenv').config();

module.exports = {
  sourceDirectory: process.env.SOURCE_DIRECTORY || './batches',
  openAIEndpoint: process.env.OPENAI_ENDPOINT || 'https://api.openai.com/v1/batches',
  apiKey: process.env.OPENAI_API_KEY,
  port: process.env.PORT || 3000,
};
