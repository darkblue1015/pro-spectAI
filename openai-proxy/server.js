const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors package
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Proxy endpoint for interacting with OpenAI API
app.post('/api/analyze', async (req, res) => {
    const { messages } = req.body;
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "text-davinci-003",
            prompt: `Analyze the following conversation and provide a detailed report:\n${messages}`,
            max_tokens: 100
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data.choices[0].text);
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});