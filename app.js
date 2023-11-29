const express = require('express');
const { fetchAndSaveData } = require('./controller');

const app = express();
const PORT = 3000;

app.get('/fetch-and-save', fetchAndSaveData);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
