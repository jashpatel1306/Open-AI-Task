const fs = require('fs');
const path = require('path');

function getFiles(directory) {
  return fs.readdirSync(directory).filter(file => file.endsWith('.batch'));
}

function getFileStats(filePath) {
  return fs.statSync(filePath);
}

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

module.exports = { getFiles, getFileStats, readFile };
