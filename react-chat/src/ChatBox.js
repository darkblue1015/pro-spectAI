import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChatBox.css";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FormatSizeSharpIcon from "@mui/icons-material/FormatSizeSharp";
import CandidateImage from "./Candidate.png";
import CEOImage from "./Zack.png";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5001/messages");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
      avatar: CandidateImage,
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    try {
      const aiResponse = await getAIResponse(input);
      const aiMessage = {
        sender: "ai",
        text: aiResponse,
        avatar: CEOImage,
      };

      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);
      setInput("");

      await axios.post("http://localhost:5001/messages", userMessage);
      await axios.post("http://localhost:5001/messages", aiMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const getAIResponse = async (userInput) => {
    try {
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
      console.log("OpenAI API Key:", apiKey);

      if (!apiKey) {
        throw new Error(
          "OpenAI API key is not defined. Please check your .env file."
        );
      }

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `# Company Introduction: 
      # Current Company Structure:
      ## CEO[CEO] --> CTO[CTO]
      ## CEO --> PMM[Product Marketing Manager]
      ## CEO --> UX[UX Designer]
      ## CTO --> FE[Frontend Engineer]
      ## CTO --> BE[Backend Engineer]
      # Company Industry: Human Resource
      # Company Stage: Pre-seed
      # Key Questions in Mind 
      ## What is the product you are building: Early Talent Engagement & Validation Platform for Startups
      ## Why are you building it: Post-PMF Startups need streamlined skill-based assessment and culture fit for volume hiring to retain accuracy & increase speed, Post-PMF Startups need streamlined skill-based assessment and culture fit for volume hiring to retain accuracy & increase speed
      ## How are you building it: Tailored validation challenge using Multiple multimodal AI Agent
      ## Why is the team the one for building the product: In-depth personal experience resource in the field + strong team with execution
      ## Why now building the product: AI Agent development enables tailored accurate skill-based talent validation at scale
      ## What is the current traction: Developing DEMO for Investor & Potential Customers`,
            },

            { role: "user", content: userInput },
          ],
          max_tokens: 50,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      console.log("Full API Response:", response.data);

      if (
        response.data &&
        response.data.choices &&
        response.data.choices[0] &&
        response.data.choices[0].message &&
        response.data.choices[0].message.content
      ) {
        console.log(response.data.choices[0].message.content);
        return response.data.choices[0].message.content.trim();
      } else {
        console.error("Unexpected API response format:", response.data);
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error(
        "Error getting AI response:",
        error.response ? error.response.data : error.message
      );
      return "Sorry, I couldn't understand that.";
    }
  };

  return (
    <div className="chatbox">
      {/* <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-container ${
              msg.sender === "user"
                ? "user-message-container"
                : "ai-message-container"
            }`}
          >
            {msg.sender === "ai" && (
              <img
                src={msg.avatar}
                alt={`${msg.sender} avatar`}
                className="avatar"
              />
            )}
            <div
              className={msg.sender === "user" ? "user-message" : "ai-message"}
            >
              {msg.text}
            </div>
            {msg.sender === "user" && (
              <img
                src={msg.avatar}
                alt={`${msg.sender} avatar`}
                className="avatar"
              />
            )}
          </div>
        ))}
      </div> */}
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message-container">
            <img
              src={msg.avatar}
              alt={`${msg.sender} avatar`}
              className="avatar"
            />
            <div
              className={msg.sender === "user" ? "user-message" : "ai-message"}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="input-container">
        {/* <button className="icon-button">
          <AddCircleOutlineIcon />
        </button>
        <button className="icon-button">
          <FormatSizeSharpIcon />
        </button> */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button onClick={handleSend} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
