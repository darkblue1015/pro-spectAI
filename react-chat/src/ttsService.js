import axios from 'axios';

const getTTS = async (text) => {
  try {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OpenAI API key is not defined. Please check your .env file.");
    }

    const response = await axios.post(
      'https://api.openai.com/v1/audio/speech',
      {
        text: text,
        voice: 'alloy', // You can choose other available voices
        model: 'tts-1'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.audio_url; // Assuming the API returns the URL of the generated audio
  } catch (error) {
    console.error('Error generating TTS:', error.response ? error.response.data : error.message);
    throw new Error("Error generating TTS");
  }
};

export default getTTS;