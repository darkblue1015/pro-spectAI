import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OpenAI from 'openai';

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
        return batchedMessages;
    };

    const getAnalysisFromGPT = async (formattedMessages) => {
        const openai = new OpenAI({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true,
        });

        const results = [];
        for (const batch of formattedMessages) {
            try {
                const completion = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "Analyze the following conversation and provide a detailed report about whether this conversation is a good fit for the company:" },
                        { role: "user", content: batch }
                    ],
                    max_tokens: 100
                });
                results.push(completion.choices[0].message.content);
            } catch (error) {
                console.error('Error generating report from chat history:', error);
                results.push('Error generating analysis for one of the batches.', error);
            }
        }
        return results.join('\n\n');
    };
//     const getAnalysisFromGPT = async (formattedMessages) => {
//     try {
//         const response = await axios.post('http://localhost:5002/api/analyze', {
//             messages: formattedMessages.join('\n\n')
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error generating report from chat history:', error);
//         return 'Error generating analysis.';
//     }
// };

    return (
        <div>
            <h1>Chat Analysis Results</h1>
            <div style={{ whiteSpace: 'pre-wrap' }}>{analysisResult || 'Loading analysis...'}</div>
        </div>
    );
};

export default AnalysisComponent;