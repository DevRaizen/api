const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Example endpoint
app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.example.com/data?apikey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = app;
