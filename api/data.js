// Load environment variables locally (optional for local testing)
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const axios = require("axios");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt, myContext } = req.body;

    const result = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: prompt || "" },
              { text: myContext || "" }
            ]
          }
        ]
      }
    );

    res.status(200).json({
      result:
        result.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response"
    });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ error: String(error) });
  }
};
