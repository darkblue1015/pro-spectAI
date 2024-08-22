import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import axios from 'axios';
import OpenAI from 'openai';
import Engagement_image from "./funnel.png";
import head_shot from "./Headshot.png";
import "./chart.css";

const AnalysisComponent = () => {
    const [analysisResult, setAnalysisResult] = useState('');
    const [showDetails, setShowDetails] = useState(false);  

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
                        { role: "user", content: batch },
                        { role: "system", content: "Analyze the following conversation and provide a detailed report about the skill set of the candidate being a product manager for the canpany as a professional. The report should be in the following format:" },
                        { role: "system", content: "Give me the score of each skills the candidate have as a product manager for the canpany, rate 1-10" },
                        { role: "system", content: "Please provide the analysis in the following organized format: short_bio:, skills: \"technical_skills, soft_skills, soft_communication\": \"\", \"educational_background,industry_knowledge,career_aspiration, overall_evaluation " },
                    ],
                    max_tokens: 1500
                });
                results.push(completion.choices[0].message.content);
            } catch (error) {
                console.error('Error generating report from chat history:', error);
                results.push('Error generating analysis for one of the batches.', error);
            }
        }
        return results.join('\n\n');
    };

    return (
        <div>
            <Navbar />
            <div className='container'>
                <h1>Engagement Stage</h1>
                <img src={Engagement_image} alt="placeholder_for_engagement_image" className="engagement-image" />
                <h1>Talent Poll</h1>
                <div className="analysis-container">
                    <div className="header-left">
                    <img src={head_shot} alt="Candidate Headshot" className="headshot-image" />
                    <div className="candidate-details">
                        <span className="candidate-name">Gretchen Bator</span>
                        <span className="candidate-role">Product Manager</span>
                        <div className="candidate-info">
                            <span className="candidate-info-item">📍 San Diego</span>
                            <span className="candidate-info-item">1 YoE</span>
                            <span className="candidate-info-item">$70k-$100k</span>
                        </div>
                        <button className="more-details-button" onClick={() => setShowDetails(!showDetails)}>
                            {showDetails ? 'Less Details' : 'More Details'}
                        </button>
                    </div>
                    
                </div>
                    
                    {showDetails && (
                        <div className="more-details-section">
                            <h3>AI-Generated Analysis</h3>
                            <div>
                                {analysisResult || 'Loading analysis...'}
                            </div>
                        </div>
                    )}
                   
                </div>
            </div>
        </div>
        
            
    );
};

export default AnalysisComponent;