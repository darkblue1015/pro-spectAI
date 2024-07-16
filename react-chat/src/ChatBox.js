import React, { useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import "./ChatBox.css";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello, how can I assist you today?",
      sender: "Ava (AI Recruiter)",
    },
    { id: 2, text: "I need help with my resume.", sender: "You" },
  ]);

  const handleSend = (text) => {
    setMessages([
      ...messages,
      { id: messages.length + 1, text, sender: "You" },
    ]);
  };

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatBox;
