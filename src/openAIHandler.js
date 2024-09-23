const axios = require('axios');
const { apiKey, openAIEndpoint } = require('./config');

async function uploadBatch(fileContent) {
  try {
    const response = await axios.post(openAIEndpoint, {
      data: fileContent,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to upload batch: ${error.message}`);
  }
}

async function getExistingBatches() {
  try {
    const response = await axios.get(openAIEndpoint, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch existing batches: ${error.message}`);
  }
}

module.exports = { uploadBatch, getExistingBatches };
