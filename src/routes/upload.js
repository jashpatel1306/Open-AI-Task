const express = require('express');
const path = require('path');
const { getFiles, getFileStats, readFile } = require('../fileHandler');
const { uploadBatch, getExistingBatches } = require('../openAIHandler');
const { isNewer } = require('../utils');
const { sourceDirectory } = require('../config');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const files = getFiles(sourceDirectory);
    const existingBatches = await getExistingBatches();

    let uploadedFiles = [];

    for (const file of files) {
      const filePath = path.join(sourceDirectory, file);
      const localFileStats = getFileStats(filePath);

      const remoteBatch = existingBatches.find(batch => batch.name === file);
      if (!remoteBatch || isNewer(localFileStats, remoteBatch)) {
        console.log(`Uploading ${file}...`);
        const fileContent = readFile(filePath);
        await uploadBatch(fileContent);
        uploadedFiles.push(file);
        console.log(`${file} uploaded successfully.`);
      } else {
        console.log(`${file} is up-to-date, skipping...`);
      }
    }

    res.status(200).json({
      message: 'Upload process completed.',
      uploadedFiles,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred during the upload process.',
      error: error.message,
    });
  }
});

module.exports = router;
