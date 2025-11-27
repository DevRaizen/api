const axios = require('axios');

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      `https://api.example.com/data?apikey=${process.env.API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}
