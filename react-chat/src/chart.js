import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import OpenAI from "openai";
import Engagement_image from "./funnel.png";
import head_shot from "./Headshot.png";
// import { Line } from 'react-chartjs-2';
import radarGraph from "./Frame 427318923.png";
import "./chart.css";

const AnalysisComponent = () => {
  const [analysisResult, setAnalysisResult] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchAndAnalyzeData();
  }, []);

  const fetchAndAnalyzeData = async () => {
    const formattedMessages = await fetchAndFormatData();
    const analysis = await getAnalysisFromGPT(formattedMessages);
    console.log("Analysis result:", analysis);
    setAnalysisResult(analysis);
  };

  const fetchAndFormatData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/messages");
      const messages = response.data;
      return formatMessagesForGPTBatch(messages, 10);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      return [];
    }
  };

  const formatMessagesForGPTBatch = (messages, batchSize) => {
    let batchedMessages = [];
    for (let i = 0; i < messages.length; i += batchSize) {
      const batch = messages.slice(i, i + batchSize);
      batchedMessages.push(
        batch.map((msg) => `${msg.sender} says: "${msg.text}"`).join("\n")
      );
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
            {
              role: "system",
              content:
                "Give me the score and a detailed report of each skills the candidate have as a product manager for the canpany, rate 1-10",
            },
            // { role: "system", content: "Please provide the analysis in the following organized format: short_bio:, skills: \"technical_skills, soft_skills, soft_communication\": \"\", \"educational_background,industry_knowledge,career_aspiration, overall_evaluation " },
            {
              role: "system",
              content: `Please analyze the following conversation and provide a detailed report in JSON format with the following structure: 
                    {
                        "short_bio": "string",
                        "elevator_pitch": "string",
                        "skills": {
                            "technical_skills": "string",
                            "soft_skills": "string",
                            "communication_skills": "string"
                        },
                        "educational_background": "string",
                        "industry_knowledge": "string",
                        "career_aspiration": "string",
                        "overall_evaluation": "string"
                    }`,
            },
          ],
          max_tokens: 1000,
        });
        // Parse the JSON response
        const report = JSON.parse(completion.choices[0].message.content);
        results.push(report);
      } catch (error) {
        console.error("Error generating report from chat history:", error);
        results.push(
          "Error generating analysis for one of the batches.",
          error
        );
      }
    }
    console.log("ChatGPT response:", results[0]);
    // return results.join('\n');
    return results[0];
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Engagement Stage</h1>
        <img
          src={Engagement_image}
          alt="placeholder_for_engagement_image"
          className="engagement-image"
        />
        <h1>Talent Poll</h1>
        <div className="analysis-container">
          <div className="header-left">
            <img
              src={head_shot}
              alt="Candidate Headshot"
              className="headshot-image"
            />
            <div className="candidate-details">
              <div className="candidate-name-role">
                <span className="candidate-name">Gretchen Bator</span>
                <span className="candidate-role">Product Manager</span>
              </div>
              <div className="candidate-info">
                <span className="candidate-info-item">📍 San Diego</span>
                <span className="candidate-info-item">1 YoE</span>
                <span className="candidate-info-item">$70k-$100k</span>
              </div>
              <button
                className="more-details-button"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? "Less Details" : "More Details"}
              </button>
            </div>
          </div>

          {showDetails && (
            <div className="expanded-details-section">
              {/* <div>
                                {analysisResult || 'Loading analysis...'}
                            </div> */}
              <div className="details-section">
                <div className="short-bio-section">
                  <h4>Short Bio</h4>
                  {/* <p>Hi, I’m Gretchen, a Product Manager with 1 years of experience. I specialize in user-centered design, agile methodologies, and data-driven decision-making.</p> */}
                  <p>{analysisResult.short_bio || "Loading short bio..."}</p>
                </div>

                <div className="elevator-pitch-section">
                  <h4>Elevator Pitch</h4>
                  {/* <p>Hi, I’m Esther, a Product Manager with 2 years of experience. I specialize in user-centered design, agile methodologies, and data-driven decision-making. My track record includes delivering innovative AI solutions that streamline HR processes and enhance decision-making. I’m passionate about solving complex problems and creating exceptional user experiences. I’m excited about opportunities to bring cutting-edge products to life and achieve sustained success.</p> */}
                  <p>
                    {analysisResult.elevator_pitch ||
                      "Loading elevator pitch..."}
                  </p>
                </div>

                <div className="file-section">
                  <h4>Files</h4>
                  <div className="files-section">
                    <button className="file-button">Resume</button>
                    <button className="file-button">Cover Letter</button>
                  </div>
                </div>
              </div>

              <div className="skills-certificates-section">
                <div className="skills-section">
                  <h4>Skills</h4>
                  <ul>
                    <li>
                      Technical Skills:{" "}
                      {analysisResult.skills?.technical_skills || "Loading..."}
                    </li>
                    <li>
                      Soft Skills:{" "}
                      {analysisResult.skills?.soft_skills || "Loading..."}
                    </li>
                    <li>
                      Communication Skills:{" "}
                      {analysisResult.skills?.communication_skills ||
                        "Loading..."}
                    </li>
                  </ul>
                </div>

                <div className="certificates-section">
                  <h4>Certificates</h4>
                  <p>Customer Insights by PRO-spect AI</p>
                </div>
              </div>

              <div className="ai-evaluation-section">
                <h4>AI Evaluation from Meetup</h4>
                <img
                  src={radarGraph}
                  alt="AI Radar Chart"
                  className="ai-radar-chart"
                />
                <div className="recruiter-notes">
                  <div className="industry-knowledge-section">
                    <h4>Industry Knowledge</h4>
                    <p>
                      {analysisResult.industry_knowledge ||
                        "Loading industry knowledge..."}
                    </p>
                  </div>

                  <div className="career-aspiration-section">
                    <h4>Career Aspiration</h4>
                    <p>
                      {analysisResult.career_aspiration ||
                        "Loading career aspiration..."}
                    </p>
                  </div>

                  <div className="overall-evaluation-section">
                    <h4>Overall Evaluation</h4>
                    <p>
                      {analysisResult.overall_evaluation ||
                        "Loading overall evaluation..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisComponent;
