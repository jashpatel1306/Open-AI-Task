const express = require('express');
const { port } = require('./config');
const uploadRouter = require('./routes/upload');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/upload', uploadRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
