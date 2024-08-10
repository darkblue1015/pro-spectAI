import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnalysisComponent = () => {
    const [analysisResult, setAnalysisResult] = useState('');

    useEffect(() => {
        fetchAndAnalyzeData();
    }, []);

    

    const fetchAndAnalyzeData = async () => {
        const formattedMessages = await fetchAndFormatData();
        const analysis = await getAnalysisFromGPT(formattedMessages);
        setAnalysisResult(analysis);
    };

    const fetchAndFormatData = async () => {
        try {
            const response = await axios.get('http://localhost:5001/messages');
            const messages = response.data;
            // Assume each batch can have a maximum of 10 messages for simplicity
            return formatMessagesForGPTBatch(messages, 10);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
            return [];
        }
    };

    const formatMessagesForGPTBatch = (messages, batchSize) => {
        let batchedMessages = [];
        for (let i = 0; i < messages.length; i += batchSize) {
            const batch = messages.slice(i, i + batchSize);
            batchedMessages.push(batch.map(msg => `${msg.sender} says: "${msg.text}"`).join('\n'));
        }
        console.log(batchedMessages)
        return batchedMessages;
    };

    const getAnalysisFromGPT = async (formattedMessages) => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

    const results = [];
    for (const batch of formattedMessages) {
        const body = {
            model: "text-davinci-003",
            prompt: `Analyze the following conversation and provide a detailed report:\n${batch}`,
            max_tokens: 1024
        };

        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', body, { headers });
            results.push(response.data.choices[0].text);
        } catch (error) {
            console.error('Error generating report from chat history:', error);
            results.push('Error generating analysis for one of the batches.');
        }
        }
        return results.join('\n\n'); // Join all results with a separator
    };

    return (
        <div>
            <h1>Chat Analysis Results</h1>
            <div style={{ whiteSpace: 'pre-wrap' }}>{analysisResult || 'Loading analysis...'}</div>
        </div>
    );
};

export default AnalysisComponent;